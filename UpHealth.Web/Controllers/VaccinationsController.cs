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
using UpHealth.Web.Services.Vaccines;
using UpHealth.Web.Util;

namespace UpHealth.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VaccinationsController : ControllerBase
    {
        private readonly HealthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly VaccineService _vaccineService;

        public VaccinationsController(HealthDbContext context, UserManager<ApplicationUser> userManager, VaccineService vaccineService)
        {
            _context = context;
            _userManager = userManager;
            _vaccineService = vaccineService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VaccinationDto>>> GetVaccinations()
        {
            var userId = _userManager.GetUserId(User);
            var vaccinations = await _context.Vaccinations
                .Where(v => v.UserId == userId)
                .ToListAsync();

            return Ok(vaccinations.Select(v => v.ToDto()));
        }

        [HttpPost]
        public async Task<ActionResult<VaccinationDto>> AddVaccination(CreateVaccinationDto dto)
        {
            var userId = _userManager.GetUserId(User);
            var vaccination = dto.ToEntity(userId!);

            _context.Vaccinations.Add(vaccination);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVaccinations), new { id = vaccination.Id }, vaccination.ToDto());
        }

        [HttpGet("merged")]
        public async Task<IActionResult> GetMergedVaccinations()
        {
            var userId = _userManager.GetUserId(User);

            var patientVaccinations = await _context.Vaccinations
                .Where(v => v.UserId == userId)
                .ToListAsync();

            var merged = _vaccineService.GetMergedVaccinations(patientVaccinations);

            return Ok(merged);
        }
    }

}