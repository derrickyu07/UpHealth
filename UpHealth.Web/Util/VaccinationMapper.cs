using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpHealth.Web.DTOs;

namespace UpHealth.Web.Util
{
    public static class VaccinationMapper
    {
        public static Vaccination ToEntity(this CreateVaccinationDto dto, string userId)
        {
            return new Vaccination
            {
                VaccineName = dto.VaccineName,
                DateAdministered = dto.DateAdministered,
                Provider = dto.Provider,
                UserId = userId
            };
        }

        public static VaccinationDto ToDto(this Vaccination v)
        {
            return new VaccinationDto
            {
                Id = v.Id,
                VaccineName = v.VaccineName,
                DateAdministered = v.DateAdministered,
                Provider = v.Provider
            };
        }
    }

}