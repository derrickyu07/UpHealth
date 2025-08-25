// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using UpHealth.Web.DTOs;

// namespace UpHealth.Web.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class HealthRecordsController : ControllerBase
//     {
//         private readonly HealthDbContext _context;

//         public HealthRecordsController(HealthDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/healthrecords
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<HealthRecordDto>>> GetHealthRecords()
//         {
//             var records = await _context.HealthRecords
//                 .Include(hr => hr.User)
//                 .Select(hr => new HealthRecordDto
//                 {
//                     Id = hr.Id,
//                     UserId = hr.UserId,
//                     UserName = $"{hr.User.FirstName} {hr.User.LastName}",
//                     RecordType = hr.RecordType,
//                     Title = hr.Title,
//                     Description = hr.Description,
//                     RecordDate = hr.RecordDate,
//                     Doctor = hr.Doctor,
//                     Facility = hr.Facility
//                 })
//                 .ToListAsync();

//             return Ok(records);
//         }

//         // GET: api/healthrecords/user/5
//         [HttpGet("user/{userId}")]
//         public async Task<ActionResult<IEnumerable<HealthRecordDto>>> GetHealthRecordsByUser(int userId)
//         {
//             var records = await _context.HealthRecords
//                 .Include(hr => hr.User)
//                 .Where(hr => hr.UserId == userId)
//                 .Select(hr => new HealthRecordDto
//                 {
//                     Id = hr.Id,
//                     UserId = hr.UserId,
//                     UserName = $"{hr.User.FirstName} {hr.User.LastName}",
//                     RecordType = hr.RecordType,
//                     Title = hr.Title,
//                     Description = hr.Description,
//                     RecordDate = hr.RecordDate,
//                     Doctor = hr.Doctor,
//                     Facility = hr.Facility
//                 })
//                 .ToListAsync();

//             return Ok(records);
//         }

//         // GET: api/healthrecords/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<HealthRecordDto>> GetHealthRecord(int id)
//         {
//             var record = await _context.HealthRecords
//                 .Include(hr => hr.User)
//                 .FirstOrDefaultAsync(hr => hr.Id == id);

//             if (record == null)
//             {
//                 return NotFound();
//             }

//             var recordDto = new HealthRecordDto
//             {
//                 Id = record.Id,
//                 UserId = record.UserId,
//                 UserName = $"{record.User.FirstName} {record.User.LastName}",
//                 RecordType = record.RecordType,
//                 Title = record.Title,
//                 Description = record.Description,
//                 RecordDate = record.RecordDate,
//                 Doctor = record.Doctor,
//                 Facility = record.Facility
//             };

//             return Ok(recordDto);
//         }

//         // POST: api/healthrecords
//         [HttpPost]
//         public async Task<ActionResult<HealthRecordDto>> CreateHealthRecord(CreateHealthRecordDto createDto)
//         {
//             var record = new HealthRecord
//             {
//                 UserId = createDto.UserId,
//                 RecordType = createDto.RecordType,
//                 Title = createDto.Title,
//                 Description = createDto.Description,
//                 RecordDate = createDto.RecordDate,
//                 Doctor = createDto.Doctor,
//                 Facility = createDto.Facility
//             };

//             _context.HealthRecords.Add(record);
//             await _context.SaveChangesAsync();

//             return CreatedAtAction(nameof(GetHealthRecord), new { id = record.Id }, record);
//         }

//         // PUT: api/healthrecords/5
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateHealthRecord(int id, UpdateHealthRecordDto updateDto)
//         {
//             var record = await _context.HealthRecords.FindAsync(id);

//             if (record == null)
//             {
//                 return NotFound();
//             }

//             record.RecordType = updateDto.RecordType;
//             record.Title = updateDto.Title;
//             record.Description = updateDto.Description;
//             record.RecordDate = updateDto.RecordDate;
//             record.Doctor = updateDto.Doctor;
//             record.Facility = updateDto.Facility;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!HealthRecordExists(id))
//                 {
//                     return NotFound();
//                 }
//                 throw;
//             }

//             return NoContent();
//         }

//         // DELETE: api/healthrecords/5
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteHealthRecord(int id)
//         {
//             var record = await _context.HealthRecords.FindAsync(id);
//             if (record == null)
//             {
//                 return NotFound();
//             }

//             _context.HealthRecords.Remove(record);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool HealthRecordExists(int id)
//         {
//             return _context.HealthRecords.Any(e => e.Id == id);
//         }
//     }
// }
