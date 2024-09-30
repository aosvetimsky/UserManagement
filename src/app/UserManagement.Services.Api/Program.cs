using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Persistence;
using UserManagement.Persistence.Models;
using UserManagement.Services;
using UserManagement.Services.Api;
internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString(nameof(AppDbContext)));
        });
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("spa", policyBuilder =>
            {
                policyBuilder.WithOrigins(configuration["FrontEndUrl"]);
                policyBuilder.AllowAnyMethod();
                policyBuilder.AllowAnyHeader();
            });
        });
        builder.Services
            .AddIdentityApiEndpoints<AppUser>()
            .AddRoles<IdentityRole>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddEntityFrameworkStores<AppDbContext>();

        builder.Services.AddAuthorization();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtOptions:SecretKey"]))
                };
            });

        builder.Services.AddApplicationServices(configuration);

        var app = builder.Build();

        InitDb(app.Services).GetAwaiter().GetResult();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("spa");

        app.UseStaticFiles(new StaticFileOptions()
        {
            // to store files locally
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
            RequestPath = new PathString("/Resources")
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

    private static async Task InitDb(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        using var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await ctx.Database.EnsureCreatedAsync();
        await SomeSeedData.SeedUsers(ctx, scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>(), scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>());
    }
}