using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
public class UserProfile
{
    [Key]
    public int Id { get; set; }

    // Foreign key for User model
    [ForeignKey("User")]
    public string? UserId { get; set; }  // Foreign key, assuming User is linked via an Id field

    // Profile-related fields
    public int Age { get; set; }
    public string MedicalHistory { get; set; } = string.Empty;
    public string PreferredProviders { get; set; } = string.Empty;

    // Navigation property to the User model
    public virtual ApplicationUser? User { get; set; }  // Navigation property for easy lookup of the associated user
}
