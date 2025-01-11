using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZurnaciApi.Data;
using ZurnaciApi.Dtos;
using ZurnaciApi.Helpers;
using ZurnaciApi.Models;

namespace ZurnaciApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return Conflict(new { message = "This email is already registered." });
            }

            
            user.isAdmin = false;
            user.balance = 10000;
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginData)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginData.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.Now.AddHours(1)
            });

            var isAdmin = user.isAdmin;

            if (isAdmin)
            {
                var adminCookieValue = BCrypt.Net.BCrypt.HashPassword("ThisManAdmin");

                
                Response.Cookies.Append("isAdmin", adminCookieValue, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,  
                    Expires = DateTime.Now.AddHours(1)  
                });
            }

            return Ok(new { token = jwt });
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }

                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return Unauthorized();
                }

                return Ok(user);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            Response.Cookies.Delete("isAdmin");

            return Ok(new { message = "Logout successful" });
        }
    }
}
