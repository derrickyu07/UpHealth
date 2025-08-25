using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class HealthRecord
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? UserId { get; set; }

    public int? AppointmentId { get; set; }

    [Required]
    public DateTime RecordDate { get; set; } = DateTime.UtcNow;

    [Required]
    [MaxLength(100)]
    public string RecordType { get; set; } = string.Empty; // "Checkup", "Vaccination", "Lab Result"

    [MaxLength(200)]
    public string? Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Doctor { get; set; } = string.Empty;
    public string Facility { get; set; } = string.Empty;
    // Navigation properties
    [ForeignKey("UserId")]
    public virtual required ApplicationUser User { get; set; }

    [ForeignKey("AppointmentId")]
    public virtual Appointment? Appointment { get; set; }
}