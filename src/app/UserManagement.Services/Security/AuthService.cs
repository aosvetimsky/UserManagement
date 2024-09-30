using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Security
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<Persistence.Models.AppUser> _userManager;
        public AuthService(UserManager<Persistence.Models.AppUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<Permission[]> GetUserPermissions(string email)
        {
            var userRole = await GetUserRole(email);
            // some simple roles to permissions mapping
            return userRole == UserRole.Admin ? Enum.GetValues<Permission>() : [Permission.UsersView];
        }

        // user can have multiple roles, simplifying to a single one
        public async Task<UserRole> GetUserRole(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new Exception("User not found exception");

            var userRoles = await _userManager.GetRolesAsync(user);
            return userRoles.Contains(UserRole.Admin.ToString()) ? UserRole.Admin : UserRole.User;
        }
    }
}
