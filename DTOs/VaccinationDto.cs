using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpHealth.Web.DTOs
{
    public class VaccinationDto
    {
        public int Id { get; set; }
        public string VaccineName { get; set; } = string.Empty;
        public DateTime DateAdministered { get; set; }
        public string Provider { get; set; } = string.Empty;
    }
    public class CreateVaccinationDto
    {
        public string VaccineName { get; set; } = string.Empty;
        public DateTime DateAdministered { get; set; }
        public string Provider { get; set; } = string.Empty;
    }

}