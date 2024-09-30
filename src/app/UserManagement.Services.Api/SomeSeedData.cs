using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Persistence;
using UserManagement.Persistence.Models;
using UserManagement.Services.Extensions;
using UserManagement.Services.Security;

namespace UserManagement.Services.Api
{
    public class SomeSeedData
    {
        private static readonly string[] FirstNames =
        {
            "Alex", "Tom", "Edvard", "Darius", "John", "Tomas", "Garry", "Sara", "Tanya", "Adam", "Vera", "Katty"
        };

        private static readonly string[] LastNames =
        {
            "Smith", "Adams", "Chaze", "Dorn", "Mizu", "Scoffield", "Barroos", "Bellick", "Tomos", "Gonsaliz", "Pilanio", "Yerch"
        };

        private static readonly string DefaultPassword = "Ab12345$";

        public static async Task SeedUsers(AppDbContext ctx, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await AddRoles(ctx, roleManager);
            await AddUsers(ctx, userManager);
        }

        private static async Task AddUsers(AppDbContext ctx, UserManager<AppUser> userManager)
        {
            if (!ctx.Users.Any())
            {
                var adminUser = new AppUser
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com"
                };

                var createAdminResult = await userManager.CreateAsync(adminUser, DefaultPassword);

                if (createAdminResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, UserRole.Admin.ToString());
                }

                foreach (int index in Enumerable.Range(0, 50))
                {
                    string firstName = FirstNames.Random();
                    string lastName = LastNames.Random();
                    var user = new AppUser
                    {
                        UserName = $"{firstName}{lastName}{index}",
                        Email = $"{firstName}{lastName}{index}@gmail.com"
                    };

                    var createUserResult = await userManager.CreateAsync(user, $"{DefaultPassword}{index}");

                    if (createUserResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, UserRole.User.ToString());
                    }
                }
            }
        }
        private static async Task AddRoles(AppDbContext ctx, RoleManager<IdentityRole> roleManager)
        {
            if (!ctx.Roles.Any())
            {
                foreach (var role in Enum.GetNames<UserRole>())
                {
                    await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = role
                    });
                }
            }
        }
    }
}
