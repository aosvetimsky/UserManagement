using Microsoft.AspNetCore.Identity;

namespace UserManagement.Persistence.Models
{
    public class AppUser : IdentityUser
    {
        public string? AvatarUrl { get; set; }
        public int SystemEntranceCount { get; set; } = 0;
        public DateTimeOffset? LastSuccessfulEntrance { get; set; }
    }
}
