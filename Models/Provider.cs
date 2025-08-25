using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpHealth.Web.Models
{
    public class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Specialty { get; set; } = "";
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}