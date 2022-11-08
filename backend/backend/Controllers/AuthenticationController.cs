using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Data;
using backend.Model;

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
                return BadRequest("User with such login already registrated");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginModel user)
        {
            if(!_context.Users.Where(u => (u.Login == user.Login && u.Password == user.Password)).Any())
            {
                return BadRequest();
            }

            string token = CreateToken(user);
            LoginResponse response = new LoginResponse();
            User foundUser = _context.Users.Where(u => u.Login == user.Login).FirstOrDefault();
            if (foundUser == null)
            {
                return BadRequest();
            }
            response.Token = token;
            response.UserId = foundUser.Id;
            response.UserType = foundUser.Type;

            return Ok(response);
        }

        private string CreateToken(LoginModel userGetted)
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
                expires: DateTime.Now.AddYears(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private User GetUserByLoginAndPassword(LoginModel user)
        {
            return _context.Users
                .Where(u => u.Login == user.Login && u.Password == user.Password)
                .ToList()
                .First();
        }
    }
}
