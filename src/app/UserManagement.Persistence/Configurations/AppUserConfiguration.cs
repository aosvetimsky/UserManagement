using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserManagement.Persistence.Models;

namespace UserManagement.Persistence.Configurations
{
    public class AppUserConfiguration: IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            //builder.ToTable("Users");
        }
    }
}
