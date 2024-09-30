namespace UserManagement.Services.Security
{
    public class JwtOptions
    {
        public string SecretKey { get; set; }
        public int ExpiresInHours { get; set; }
    }
}
