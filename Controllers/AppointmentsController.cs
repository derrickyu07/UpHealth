using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using UpHealth.Web.DTOs;
using UpHealth.Web.Util;

namespace UpHealth.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly HealthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AppointmentsController(HealthDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAppointments()
        {
            var userId = _userManager.GetUserId(User);

            var appointments = await _context.Appointments
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.StartUtc)
                .ToListAsync();

            return Ok(appointments.Select(a => a.ToDto()));
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> BookAppointment([FromBody] CreateAppointmentDto dto)
        {
            if (dto.EndUtc <= dto.StartUtc) return BadRequest("End must be after start.");

            var user = await _userManager.GetUserAsync(User); // ClaimsPrincipal -> ApplicationUser
            if (user is null) return Unauthorized();

            var userId = _userManager.GetUserId(User);
            if (userId is null) return Unauthorized();

            var provider = await _context.Providers.FindAsync(dto.ProviderId);
            if (provider is null) return NotFound("Provider not found.");

            // Double-booking guard (also enforced by unique index)
            var overlap = await _context.Appointments.AnyAsync(a =>
                a.ProviderId == dto.ProviderId &&
                !(dto.EndUtc <= a.StartUtc || dto.StartUtc >= a.EndUtc));

            if (overlap) return Conflict("Slot already booked.");

            var appt = dto.ToEntity(userId, user, provider);

            _context.Appointments.Add(appt);
            await _context.SaveChangesAsync();

            var result = new AppointmentDto
            {
                Id = appt.Id,
                ProviderId = appt.ProviderId,
                ProviderName = provider.Name,
                StartUtc = appt.StartUtc,
                EndUtc = appt.EndUtc,
                Status = AppointmentStatus.Booked,
                Type = appt.Type
            };

            return CreatedAtAction(nameof(GetAppointments), new { }, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var userId = _userManager.GetUserId(User);
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (appointment == null) return NotFound();

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}