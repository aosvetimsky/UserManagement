using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Services.Api.Transport;
using UserManagement.Services.Security;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Api.Controllers
{
    [Route("api/users")]
    [Authorize]
    [RequiresPermission(Permission.UsersView)]
    public class UsersController : ApiControllerBase
    {
        private readonly UserManager<Persistence.Models.AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserFileUploadService _fileUploadService;
        public UsersController(UserManager<Persistence.Models.AppUser> userManager, RoleManager<IdentityRole> roleManager, IUserFileUploadService fileUploadService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _fileUploadService = fileUploadService;
        }

        [HttpGet]
        [Route("search")]
        public async Task<AppUsersSearchResponse> Search([FromQuery] AppUsersSearchRequest request)
        {
            var query = _userManager.Users.OrderBy(u => u.UserName).AsQueryable();

            int totalCount = await query.CountAsync();

            if (request.Projection?.Skip != null)
            {
                query = query.Skip(request.Projection.Skip.Value);
            }

            if (request.Projection?.Take != null)
            {
                query = query.Take(request.Projection.Take.Value);
            }

            var users = await query.AsNoTracking().ToListAsync();

            var mappedUsers = new List<Transport.AppUser>();

            foreach (var user in users)
            {
                var mappedUser = await ToTransport(user);
                mappedUsers.Add(mappedUser);
            }
            return new AppUsersSearchResponse
            {
                Users = mappedUsers,
                TotalCount = totalCount
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> Get(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            return await ToTransport(user);
        }

        [HttpPost]
        [RequiresPermission(Permission.UserEdit)]
        public async Task<ActionResult<AppUsersCreateResponse>> Post([FromBody] AppUsersCreateRequest request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            var createUserResult = await _userManager.CreateAsync(new Persistence.Models.AppUser
            {
                UserName = request.UserName,
                Email = request.Email
            }, request.Password);

            if (!createUserResult.Succeeded)
            {
                return BadRequest($"Error creating user {IdentityErrorsAsString(createUserResult.Errors)}");
            }

            var createdUser = await _userManager.FindByEmailAsync(request.Email);
            await _userManager.AddToRoleAsync(createdUser, request.IsAdmin ? UserRole.Admin.ToString() : UserRole.User.ToString());

            return new AppUsersCreateResponse
            {
                User = await ToTransport(createdUser)
            };
        }

        [HttpPut("{id}")]
        [RequiresPermission(Permission.UserEdit)]
        public async Task<ActionResult<AppUsersUpdateResponse>> Put(string id, [FromBody] AppUsersUpdateRequest request)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (user.Email != request.Email)
            {
                var userWithProvidedEmail = await _userManager.FindByEmailAsync(request.Email);
                if (userWithProvidedEmail != null && userWithProvidedEmail.Id != id)
                {
                    return BadRequest("User with such email already exists");
                }
            }

            user.Email = request.Email;
            user.UserName = request.UserName;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
            {
                return BadRequest($"Error updating user {updateResult.Errors}");
            }

            var updatedUser = await _userManager.FindByEmailAsync(request.Email);

            // should be more clean way to update role
            await _userManager.RemoveFromRolesAsync(updatedUser, [UserRole.Admin.ToString(), UserRole.User.ToString()]);
            await _userManager.AddToRoleAsync(updatedUser, request.IsAdmin ? UserRole.Admin.ToString() : UserRole.User.ToString());

            return new AppUsersUpdateResponse
            {
                User = await ToTransport(updatedUser)
            };
        }

        [HttpDelete("{id}")]
        [RequiresPermission(Permission.UserDelete)]
        public async Task<ActionResult<AppUsersDeleteResponse>> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (id == UserIdentity)
            {
                return BadRequest("Cannot delete current user");
            }

            await _userManager.DeleteAsync(user);

            return new AppUsersDeleteResponse { };
        }

        [HttpPost]
        [Route("{id}/upload-avatar")]
        public async Task<ActionResult<AppUsersUploadAvatarResponse>> UploadAvatar(string id, [FromForm] AppUsersUploadAvatarRequest request)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if ( request.Avatar == null || request.Avatar.Length < 1)
            {
                return BadRequest("Avatar is empty");
            }

            if (!_fileUploadService.IsFileContentTypeAllowed(request.Avatar.ContentType))
            {
                return BadRequest("Content type is not allowed");
            }

            if (!_fileUploadService.IsFileLengthSatisfies(request.Avatar.Length))
            {
                return BadRequest("File size is exceeded");
            }

            var relativeUrl = await _fileUploadService.UploadAvatar(request.Avatar);
            user.AvatarUrl = relativeUrl;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
            {
                return BadRequest($"Error updating user {IdentityErrorsAsString(updateResult.Errors)}");
            }

            return new AppUsersUploadAvatarResponse
            {
            };
        }

        private async Task<AppUser> ReadUser(string id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
            return await ToTransport(user);
        }

        private async Task<AppUser> ToTransport(Persistence.Models.AppUser user)
        {
            // bad approach to query role for a single user, should be join somewhere
            var roleNames = await _userManager.GetRolesAsync(user);
            return new Transport.AppUser
            {
                Id = user.Id,
                LastSuccessfulEntrance = user.LastSuccessfulEntrance,
                SystemEntranceCount = user.SystemEntranceCount,
                UserName = user.UserName,
                Email = user.Email,
                Role = roleNames.Contains(UserRole.Admin.ToString()) ? UserRole.Admin.ToString(): UserRole.User.ToString(),
                IsAdmin = roleNames.Contains(UserRole.Admin.ToString()),
                AvatarUrl = user.AvatarUrl
            };
        }

        private string IdentityErrorsAsString(IEnumerable<IdentityError> errors) => string.Join(',', errors.Select(e => e.Description));
    }
}
