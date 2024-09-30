using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Services.Contracts;
using UserManagement.Services.Infrastructure;

namespace UserManagement.Services
{
    public class UserFileUploadService : IUserFileUploadService
    {
        private readonly string[] AllowedContentTypes = ["image/jpeg", "image/png"];
        private readonly IFileUploadProvider _fileUploadProvider;
        public UserFileUploadService(IFileUploadProvider fileUploadProvider)
        {
            _fileUploadProvider = fileUploadProvider;
        }
        public async Task<string> UploadAvatar(IFormFile file)
        {
            return await _fileUploadProvider.UploadFileAsync(file);
        }

        public bool IsFileContentTypeAllowed(string extension) => AllowedContentTypes.Contains(extension);
    }
}
