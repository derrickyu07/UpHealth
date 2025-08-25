using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UpHealth.Web.DTOs;

[ApiController]
[Route("api/providers")]
public class ProvidersController : ControllerBase
{
    private readonly HealthDbContext _db;
    public ProvidersController(HealthDbContext db) => _db = db;

    // GET /api/providers/{id}/slots?date=2025-08-12&tz=America/New_York
    [HttpGet("{id:int}/slots")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<SlotDto>>> GetSlots(
        int id, [FromQuery] DateOnly date, [FromQuery] string tz = "UTC", [FromQuery] int minutes = 30)
    {
        var provider = await _db.Providers.FindAsync(id);
        if (provider == null) return NotFound("Provider not found.");

        // Build day window in given tz, then convert to UTC
        var tzInfo = TimeZoneInfo.FindSystemTimeZoneById(tz);
        var localStart = new DateTime(date.Year, date.Month, date.Day, 9, 0, 0, DateTimeKind.Unspecified);
        var localEnd = new DateTime(date.Year, date.Month, date.Day, 17, 0, 0, DateTimeKind.Unspecified);
        var startUtc = TimeZoneInfo.ConvertTimeToUtc(localStart, tzInfo);
        var endUtc = TimeZoneInfo.ConvertTimeToUtc(localEnd, tzInfo);

        var existing = await _db.Appointments
            .Where(a => a.ProviderId == id && a.StartUtc >= startUtc && a.StartUtc < endUtc)
            .Select(a => new { a.StartUtc, a.EndUtc })
            .ToListAsync();

        var slots = new List<SlotDto>();
        var cursor = startUtc;
        while (cursor.AddMinutes(minutes) <= endUtc)
        {
            var s = cursor;
            var e = cursor.AddMinutes(minutes);
            var taken = existing.Any(a => !(e <= a.StartUtc || s >= a.EndUtc));
            slots.Add(new SlotDto { StartUtc = s, EndUtc = e, Available = !taken });
            cursor = e;
        }

        return Ok(slots);
    }
}
