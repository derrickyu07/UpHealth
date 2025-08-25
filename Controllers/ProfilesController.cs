using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UpHealth.Web.DTOs;
using UpHealth.Web.Util;

namespace UpHealth.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize]
    public class ProfilesController : ControllerBase  // Use ControllerBase for API controller
    {
        private readonly HealthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfilesController(HealthDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get the user's profile
        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetProfile()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized();
            }

            var profile = await _context.UserProfiles
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(ProfileMapper.MapToDto(profile));
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfileDto updatedProfileDto)
        {
            if (updatedProfileDto == null)
                return BadRequest("Profile data is required.");
            var userId = _userManager.GetUserId(User);
            if (userId == null) return Unauthorized();
            var profile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                var newProfile = new UserProfile
                {
                    UserId = userId
                };
                ProfileMapper.MapToEntity(newProfile, updatedProfileDto);
                _context.UserProfiles.Add(newProfile);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProfile), new { userId = newProfile.UserId }, ProfileMapper.MapToDto(newProfile));
            }

            ProfileMapper.MapToEntity(profile, updatedProfileDto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
