using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Vaccination
{
    [Key]
    public int Id { get; set; }

    public string VaccineName { get; set; } = string.Empty;

    public DateTime DateAdministered { get; set; }
    public string Provider { get; set; } = string.Empty;
    public int DoseNumber { get; set; } = 1;

    // Foreign Key
    public string UserId { get; set; } = string.Empty;

    [ForeignKey("UserId")]
    public ApplicationUser? User { get; set; }
}


