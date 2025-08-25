using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UpHealth.Web.Models;

public class Appointment
{
    [Key]
    public int Id { get; set; }


    public int ProviderId { get; set; }

    [Required]
    public required string UserId { get; set; }

    [Required]
    public DateTime StartUtc { get; set; }
    [Required]
    public DateTime EndUtc { get; set; }

    [Required]
    public required Provider Provider { get; set; }
    public string? Reason { get; set; } = string.Empty;

    [Required]
    public required string Type { get; set; }

    public AppointmentStatus Status { get; set; } = AppointmentStatus.Booked;

    [ForeignKey("UserId")]
    public virtual required ApplicationUser User { get; set; }
}

public enum AppointmentStatus { Booked, Cancelled, Completed, NoShow }