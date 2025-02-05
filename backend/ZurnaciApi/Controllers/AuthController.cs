﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZurnaciApi.Data;
using ZurnaciApi.Dtos;
using ZurnaciApi.Helpers;
using ZurnaciApi.Models;

namespace ZurnaciApi.Controllers
{
    [Route("api/auth")]
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
                //HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // CORS desteği için
                Expires = DateTime.Now.AddHours(1)
            });


            return Ok(new { token = jwt });
        }

        [HttpPost("admin-login")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginDto loginData)
        {
            
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginData.Email);


            if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if (!user.isAdmin)
            {
                return Forbid(new { message = "Access denied. Only admins can log in." });
            }

            var jwt = _jwtService.Generate(user.Id, user.isAdmin);

            
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                //HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(1)
            });

            return Ok(new { token = jwt, message = "Admin login successful" });
        }

        private IActionResult Forbid(object value)
        {
            throw new NotImplementedException();
        }

        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }

                var token = _jwtService.Verify(jwt);

                // isAdmin kontrolü
                var isAdmin = token.Claims.FirstOrDefault(c => c.Type == "isAdmin")?.Value;
                if (isAdmin == null || isAdmin != "True")
                {
                    return Forbid();
                }

                return Ok(new { message = "Welcome, Admin!" });
            }
            catch
            {
                return Unauthorized();
            }
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

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
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
                if (user == null || !BCrypt.Net.BCrypt.Verify(resetPasswordDto.Password, user.Password))
                {
                    return BadRequest(new { message = "Invalid old password" });
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Password updated successfully" });
            }
            catch
            {
                return BadRequest(new { message = "Failed to update password" });
            }
        }


        //[HttpGet("validate-token")]
        //public IActionResult ValidateToken()
        //{
        //    try
        //    {
        //        var jwt = Request.Cookies["jwt"];
        //        if (jwt == null)
        //        {
        //            return Unauthorized();
        //        }

        //        var token = _jwtService.Verify(jwt);
        //        return Ok(new { valid = true, token });
        //    }
        //    catch
        //    {
        //        return Unauthorized();
        //    }
        //}

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions
            {
                //HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });

            return Ok(new { message = "Logged out successfully" });
        }
    }
}
