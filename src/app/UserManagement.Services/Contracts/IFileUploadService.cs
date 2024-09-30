using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace UserManagement.Services.Contracts
{
    public interface IUserFileUploadService
    {
        Task<string> UploadAvatar(IFormFile file);
        bool IsFileContentTypeAllowed(string extension);
    }
}