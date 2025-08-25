// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using UpHealth.Web.DTOs;

// namespace UpHealth.Web.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class UsersController : ControllerBase
//     {
//         private readonly HealthDbContext _context;

//         public UsersController(HealthDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/users
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
//         {
//             var users = await _context.Users
//                 .Select(u => new UserDto
//                 {
//                     Id = u.Id,
//                     Email = u.Email,
//                     FirstName = u.FirstName,
//                     LastName = u.LastName,
//                     DateOfBirth = u.DateOfBirth,
//                     PhoneNumber = u.PhoneNumber
//                 })
//                 .ToListAsync();

//             return Ok(users);
//         }

//         // GET: api/users/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<UserDto>> GetUser(int id)
//         {
//             var user = await _context.Users.FindAsync(id);

//             if (user == null)
//             {
//                 return NotFound();
//             }

//             var userDto = new UserDto
//             {
//                 Id = user.Id,
//                 Email = user.Email,
//                 FirstName = user.FirstName,
//                 LastName = user.LastName,
//                 DateOfBirth = user.DateOfBirth,
//                 PhoneNumber = user.PhoneNumber
//             };

//             return Ok(userDto);
//         }

//         // POST: api/users
//         [HttpPost]
//         public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto createUserDto)
//         {
//             var user = new User
//             {
//                 Email = createUserDto.Email,
//                 FirstName = createUserDto.FirstName,
//                 LastName = createUserDto.LastName,
//                 DateOfBirth = createUserDto.DateOfBirth,
//                 PhoneNumber = createUserDto.PhoneNumber
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             var userDto = new UserDto
//             {
//                 Id = user.Id,
//                 Email = user.Email,
//                 FirstName = user.FirstName,
//                 LastName = user.LastName,
//                 DateOfBirth = user.DateOfBirth,
//                 PhoneNumber = user.PhoneNumber
//             };

//             return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
//         }

//         // PUT: api/users/5
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateUser(int id, UpdateUserDto updateUserDto)
//         {
//             var user = await _context.Users.FindAsync(id);

//             if (user == null)
//             {
//                 return NotFound();
//             }

//             user.Email = updateUserDto.Email;
//             user.FirstName = updateUserDto.FirstName;
//             user.LastName = updateUserDto.LastName;
//             user.DateOfBirth = updateUserDto.DateOfBirth;
//             user.PhoneNumber = updateUserDto.PhoneNumber;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!UserExists(id))
//                 {
//                     return NotFound();
//                 }
//                 throw;
//             }

//             return NoContent();
//         }

//         // DELETE: api/users/5
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteUser(int id)
//         {
//             var user = await _context.Users.FindAsync(id);
//             if (user == null)
//             {
//                 return NotFound();
//             }

//             _context.Users.Remove(user);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool UserExists(int id)
//         {
//             return _context.Users.Any(e => e.Id == id);
//         }
//     }
// }