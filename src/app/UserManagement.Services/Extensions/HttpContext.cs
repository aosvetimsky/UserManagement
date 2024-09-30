using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace UserManagement.Services.Extensions
{
    public static class HttpContextExtensions
    {
        public static string? GetClamValue(this HttpContext httpContext, string claimType) => (httpContext.User.Identity as ClaimsIdentity)?.FindFirst(claimType)?.Value;
    }
}
