using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpHealth.Web.DTOs
{
    public class MergedVaccinationDto
    {
        public string VaccineName { get; set; } = string.Empty;
        public bool Mandatory { get; set; }
        public int RecommendedAgeStart { get; set; }
        public int RecommendedAgeEnd { get; set; }
        public int? ValidityMonths { get; set; }
        public int? BoosterIntervalMonths { get; set; }
        public List<DoseInfoDto> Doses { get; set; } = new List<DoseInfoDto>();
        public DateTime? DateAdministered { get; set; }
        public string? Provider { get; set; }
    }

    public class DoseInfoDto
    {
        public int DoseNumber { get; set; }
        public bool Taken { get; set; }
        public DateTime? DateAdministered { get; set; }
        public string? Provider { get; set; }
    }
}