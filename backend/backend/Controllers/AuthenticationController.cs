using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DBAtarkProjectContext _context;

        public AuthenticationController(IConfiguration configuration, DBAtarkProjectContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Registration")]
        public async Task<ActionResult<User>> Registration(User user)
        {
            var foundUser = _context.Users.Where(x => x.Login == user.Login).ToList();
            if (foundUser.Count != 0)
            {
                return BadRequest();
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpGet("Login")]
        public async Task<ActionResult<string>> Login(User user)
        {
            if(!_context.Users.Where(u => (u.Login == user.Login && u.Password == user.Password)).Any())
            {
                return BadRequest();
            }

            string token = CreateToken(user);
            return Ok(token);
        }

        private string CreateToken(User userGetted)
        {
            User user = GetUserByLoginAndPassword(userGetted);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Login),
                new Claim(ClaimTypes.Role, user.Type)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("Secret").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private User GetUserByLoginAndPassword(User user)
        {
            return _context.Users
                .Where(u => u.Login == user.Login && u.Password == user.Password)
                .ToList()
                .First();
        }
    }
}
