using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserManagement.Persistence.Models;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Security
{
    public class TokenService : ITokenService
    {
        private readonly JwtOptions _jwtOptions;
        public TokenService(IOptions<JwtOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
        }

        public string CreateToken(AppUser appUser, UserRole role)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Email, appUser.Email),
                new Claim(ClaimTypes.Role, UserRole.Admin.ToString())
            };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(_jwtOptions.ExpiresInHours),
                claims: claims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
