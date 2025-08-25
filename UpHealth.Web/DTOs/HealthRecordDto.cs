using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpHealth.Web.DTOs
{
    public class HealthRecordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string RecordType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime RecordDate { get; set; }
        public string Doctor { get; set; } = string.Empty;
        public string Facility { get; set; } = string.Empty;
    }
    public class CreateHealthRecordDto
    {
        public int UserId { get; set; }
        public string RecordType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime RecordDate { get; set; }
        public string Doctor { get; set; } = string.Empty;
        public string Facility { get; set; } = string.Empty;
    }
    public class UpdateHealthRecordDto
    {
        public int UserId { get; set; }
        public string RecordType { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime RecordDate { get; set; }
        public string Doctor { get; set; } = string.Empty;
        public string Facility { get; set; } = string.Empty;
    }
}