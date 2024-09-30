using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserManagement.Services.Contracts;
using UserManagement.Services.Extensions;

namespace UserManagement.Services.Security
{
    // you should use claim based auth model with policies (especially for external users your system cannot not authorized with permissions)
    public class RequiresPermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly Permission[] _permissions;

        public RequiresPermissionAttribute(params Permission[] permissions)
        {
            _permissions = permissions;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var authService = context.HttpContext.RequestServices.GetRequiredService<IAuthService>();
            var userPermissions = await authService.GetUserPermissions(context.HttpContext.GetClamValue(ClaimTypes.Email));

            if (!userPermissions.ToList().Intersect(_permissions).Any())
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
