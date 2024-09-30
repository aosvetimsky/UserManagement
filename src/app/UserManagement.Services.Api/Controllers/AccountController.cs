using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using UserManagement.Services.Api.Transport;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IAuthService _authService;
        private readonly UserManager<Persistence.Models.AppUser> _userManager;
        private readonly SignInManager<Persistence.Models.AppUser> _signInManager;

        public AccountController(ITokenService tokenService, IAuthService authService, SignInManager<Persistence.Models.AppUser> signInManager, UserManager<Persistence.Models.AppUser> userManager) 
        {
            _tokenService = tokenService;
            _authService = authService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<UserLoginResponse>> Login([FromBody]UserLoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Unauthorized("User not found");
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!signInResult.Succeeded)
            {
                return Unauthorized("Failed login attempt");
            }

            var userRole = await _authService.GetUserRole(user.Email);
            var token = _tokenService.CreateToken(user, userRole);

            user.LastSuccessfulEntrance = DateTimeOffset.UtcNow;
            user.SystemEntranceCount = user.SystemEntranceCount + 1;
            await _userManager.UpdateAsync(user);

            return new UserLoginResponse 
            {
                Token = token,
                User = new AppUser
                {
                    Email = user.Email,
                    UserName = user.UserName,
                }
            };
        }
    }
}
