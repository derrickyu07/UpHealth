using UpHealth.Web.DTOs;

namespace UpHealth.Web.Util
{
    public static class ProfileMapper
    {
        public static UserProfileDto MapToDto(UserProfile profile)
        {
            return new UserProfileDto
            {
                Id = profile.Id,
                UserId = profile.UserId,
                Age = profile.Age,
                MedicalHistory = profile.MedicalHistory,
                PreferredProviders = profile.PreferredProviders
            };
        }

        public static void MapToEntity(UserProfile profile, UserProfileDto dto)
        {
            profile.Age = dto.Age;
            profile.MedicalHistory = dto.MedicalHistory;
            profile.PreferredProviders = dto.PreferredProviders;
        }
    }
}
