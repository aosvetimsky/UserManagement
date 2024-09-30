using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserManagement.Persistence.Configurations;
using UserManagement.Persistence.Models;

namespace UserManagement.Persistence
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AppUserConfiguration());

            base.OnModelCreating(builder);
        }
        public DbSet<AppUser> AppUsers { get; set; }
    }
}
