using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserManagement.Services.Contracts;
using UserManagement.Services.Infrastructure;
using UserManagement.Services.Security;

namespace UserManagement.Services
{
    public static class Config
    {
        public static void AddApplicationServices(this IServiceCollection services, ConfigurationManager configuration)
        {
            services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IFileUploadProvider, SelfFileUploadProvider>();
            services.AddScoped<IUserFileUploadService, UserFileUploadService>();
            services.AddScoped<IWeatherHistoryService, ExternalWeatherHistoryService>();
        }
    }
}
