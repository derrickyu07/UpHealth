using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using UpHealth.Web.Models;

public class HealthDbContext : IdentityDbContext<ApplicationUser>
{
    public HealthDbContext(DbContextOptions<HealthDbContext> options) : base(options) { }

    public DbSet<HealthRecord> HealthRecords { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Vaccination> Vaccinations { get; set; }

    public DbSet<Provider> Providers => Set<Provider>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);

        // Prevent double-booking a provider at the same start time
        b.Entity<Appointment>()
            .HasIndex(a => new { a.ProviderId, a.StartUtc })
            .IsUnique();

        // Basic FK
        b.Entity<Appointment>()
            .HasOne(a => a.Provider)
            .WithMany(p => p.Appointments)
            .HasForeignKey(a => a.ProviderId);

        b.Entity<Provider>().HasData(
        new Provider { Id = 1, Name = "Dr. Rivera", Specialty = "Primary Care" },
        new Provider { Id = 2, Name = "Dr. Chen", Specialty = "Dermatology" },
        new Provider { Id = 3, Name = "Dr. Patel", Specialty = "Pediatrics" },
        new Provider { Id = 4, Name = "Dr. Gomez", Specialty = "Cardiology" });


    }


}
