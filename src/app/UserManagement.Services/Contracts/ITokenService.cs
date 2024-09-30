using UserManagement.Persistence.Models;
using UserManagement.Services.Security;

namespace UserManagement.Services.Contracts
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser, UserRole role);
    }
}
