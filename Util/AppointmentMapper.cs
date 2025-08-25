using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpHealth.Web.DTOs;
using UpHealth.Web.Models;

namespace UpHealth.Web.Util
{
    public static class AppointmentMapper
    {
        public static Appointment ToEntity(this CreateAppointmentDto dto, string userId, ApplicationUser user, Provider provider)
        {
            return new Appointment
            {
                UserId = userId,
                ProviderId = dto.ProviderId,
                Provider = provider,
                StartUtc = DateTime.SpecifyKind(dto.StartUtc, DateTimeKind.Utc),
                EndUtc = DateTime.SpecifyKind(dto.EndUtc, DateTimeKind.Utc),
                Reason = dto.Reason,
                Type = dto.Type,
                Status = AppointmentStatus.Booked,
                User = user,
            };
        }

        public static AppointmentDto ToDto(this Appointment entity)
        {
            return new AppointmentDto
            {
                Id = entity.Id,
                ProviderId = entity.Provider.Id,
                ProviderName = entity.Provider.Name,
                StartUtc = entity.StartUtc,
                EndUtc = entity.EndUtc,
                Type = entity.Type,
                Status = entity.Status

            };
        }
    }

}