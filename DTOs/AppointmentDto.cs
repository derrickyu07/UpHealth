using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpHealth.Web.Models;

namespace UpHealth.Web.DTOs
{
    public class AppointmentDto
    {
        public int? Id { get; set; }
        public int ProviderId { get; set; }
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public string ProviderName { get; set; } = "";
        public required string Type { get; set; }
        public required AppointmentStatus Status { get; set; }
        public string? Reason { get; set; }
    }
    public class CreateAppointmentDto
    {
        public int ProviderId { get; set; }
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public required Provider Provider { get; set; }
        public string Type { get; set; } = string.Empty;
        public string? Reason { get; set; }
        public AppointmentStatus Status { get; set; }
    }
    public class SlotDto
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public bool Available { get; set; }
    }

}
