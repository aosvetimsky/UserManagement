using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UserManagement.Services.Api.Transport
{
    public class AppUser
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public int SystemEntranceCount { get; set; } = 0;
        public DateTimeOffset? LastSuccessfulEntrance { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class AppUsersSearchRequest
    {
        public string? UserName { get; set; }
        public QueryProjection? Projection { get; set; }
    }

    public class AppUsersSearchResponse
    {
        public IEnumerable<AppUser> Users { get; set; }
        public int TotalCount { get; set; }
    }

    public class AppUsersDeleteResponse
    {

    }

    public class AppUsersCreateRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class AppUsersCreateResponse
    {
        public AppUser User { get; set; }
    }

    public class AppUsersUpdateRequest
    {
        //public IFormFile Avatar { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
    }

    public class AppUsersUpdateResponse
    {
        public AppUser User { get; set; }
    }

    public class AppUsersUploadAvatarRequest
    {
        public IFormFile Avatar { get; set; }
        
    }

    public class AppUsersUploadAvatarResponse
    {
    }
}
