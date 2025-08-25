namespace UpHealth.Web.DTOs
{
    public class UserProfileDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int Age { get; set; }
        public string MedicalHistory { get; set; } = string.Empty;
        public string PreferredProviders { get; set; } = string.Empty;
    }
}