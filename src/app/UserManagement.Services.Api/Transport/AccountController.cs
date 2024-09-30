using System.ComponentModel.DataAnnotations;

namespace UserManagement.Services.Api.Transport
{
    public class UserLoginRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserLoginResponse
    {
        public AppUser User { get; set; }
        public string Token { get; set; }
    }
}
