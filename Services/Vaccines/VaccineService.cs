using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using UpHealth.Web.Models;

namespace UpHealth.Web.Services.Vaccines
{
    using System.Text.Json;
    using System.Text.Json.Serialization;
    using UpHealth.Web.DTOs;

    public class VaccineService
    {
        private readonly List<VaccineType> _vaccines;

        public VaccineService()
        {
            // Load JSON once at startup
            var json = File.ReadAllText("Data/Seed/vaccinations.json");
            _vaccines = JsonSerializer.Deserialize<List<VaccineType>>(json) ?? [];
        }

        // Get all vaccines
        public List<VaccineType> GetAllVaccines() => _vaccines;
        public List<MergedVaccinationDto> GetMergedVaccinations(List<Vaccination> patientVaccinations)
        {
            return _vaccines.Select(vaccine =>
            {
                // Find all doses the patient has taken for this vaccine
                var dosesTaken = patientVaccinations
                    .Where(p => p.VaccineName == vaccine.VaccineName)
                    .ToList();

                return new MergedVaccinationDto
                {
                    VaccineName = vaccine.VaccineName,
                    Mandatory = vaccine.Mandatory,
                    RecommendedAgeStart = vaccine.RecommendedAgeStart,
                    RecommendedAgeEnd = vaccine.RecommendedAgeEnd,
                    ValidityMonths = vaccine.ValidityMonths,
                    BoosterIntervalMonths = vaccine.BoosterIntervalMonths,

                    Doses = Enumerable.Range(1, vaccine.DoseNumber)
                        .Select(doseNumber =>
                        {
                            var patientDose = dosesTaken.FirstOrDefault(d => d.DoseNumber == doseNumber);
                            return new DoseInfoDto
                            {
                                DoseNumber = doseNumber,
                                Taken = patientDose != null,
                                DateAdministered = patientDose?.DateAdministered,
                                Provider = patientDose?.Provider
                            };
                        }).ToList()
                };
            }).ToList();
        }
    }
    public class VaccineType
    {
        [JsonPropertyName("vaccine_name")]
        public string VaccineName { get; set; } = "";

        [JsonPropertyName("disease_prevented")]
        public string DiseasePrevented { get; set; } = "";

        [JsonPropertyName("dose_number")]
        public int DoseNumber { get; set; } = 1;

        [JsonPropertyName("recommended_age_start")]
        public int RecommendedAgeStart { get; set; }

        [JsonPropertyName("recommended_age_end")]
        public int RecommendedAgeEnd { get; set; }

        [JsonPropertyName("booster_interval")]
        public int? BoosterIntervalMonths { get; set; }

        [JsonPropertyName("validity_months")]
        public int ValidityMonths { get; set; }

        [JsonPropertyName("is_mandatory")]
        public bool Mandatory { get; set; }

        public string? Notes { get; set; }
    }
}
