using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Services.Api.Transport;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Api.Controllers
{
    [Route("api/auth")]
    [Authorize]
    public class AuthController : ApiControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet]
        [Route("user-permissions")]
        public async Task<UserPermissionsResponse> UserPermisisons()
        {
            var permissions = await _authService.GetUserPermissions(UserIdentity);

            return new UserPermissionsResponse
            {
                Permissions = permissions.Select(p => p.ToString()).ToArray()
            };
        }
    }
}
