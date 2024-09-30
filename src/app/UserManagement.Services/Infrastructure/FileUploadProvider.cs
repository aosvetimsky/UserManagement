using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace UserManagement.Services.Infrastructure
{
    public interface IFileUploadProvider
    {
        Task<string> UploadFileAsync(IFormFile file);
    }

    // shitty approach, we should use some cloud storage provider like S3
    public class SelfFileUploadProvider: IFileUploadProvider
    {
        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length < 1)
            {
                throw new Exception("File is missing");
            }

            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
            var relativePath = Path.Combine(folderName, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return relativePath;
        }
    }
}
