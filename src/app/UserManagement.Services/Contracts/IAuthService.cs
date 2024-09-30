using System.Threading.Tasks;
using UserManagement.Services.Security;

namespace UserManagement.Services.Contracts
{
    public interface IAuthService
    {
        Task<Permission[]> GetUserPermissions(string email);
        Task<UserRole> GetUserRole(string email);
    }
}