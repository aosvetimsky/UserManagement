using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UserManagement.Services.Extensions;

namespace UserManagement.Services.Api.Controllers
{
    [ApiController]
    public abstract class ApiControllerBase : ControllerBase
    {
        public string? UserIdentity => HttpContext.GetClamValue(ClaimTypes.Email);
    }
}
