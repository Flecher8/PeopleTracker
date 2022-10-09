using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // DataBase context
        private readonly DBAtarkProjectContext _context;

        public UsersController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            // Sending responce
            return new JsonResult(_context.Users);
        }
    }
}
