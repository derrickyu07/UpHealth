using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    // Add any custom properties you need for your application
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}