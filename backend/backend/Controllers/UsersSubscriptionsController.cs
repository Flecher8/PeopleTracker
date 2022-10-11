using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersSubscriptionsController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public UsersSubscriptionsController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/UsersSubscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersSubscription>>> GetUsersSubscriptions()
        {
            return await _context.UsersSubscriptions.ToListAsync();
        }

        [HttpGet("userId:{userId}")]
        public async Task<ActionResult<IEnumerable<UsersSubscription>>> GetUserSubscriptionsByUser(int userId)
        {
            return await _context.UsersSubscriptions.Where(x => x.UserId == userId).ToListAsync();
        }

        // GET: api/UsersSubscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersSubscription>> GetUserSubscription(int id)
        {
            var usersSubscription = await _context.UsersSubscriptions.FindAsync(id);

            if (usersSubscription == null)
            {
                return NotFound();
            }

            return usersSubscription;
        }

        // PUT: api/UsersSubscriptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersSubscription(int id, UsersSubscription usersSubscription)
        {
            if (id != usersSubscription.Id)
            {
                return BadRequest();
            }

            _context.Entry(usersSubscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersSubscriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/UsersSubscriptions
        [HttpPost]
        public async Task<ActionResult<UsersSubscription>> PostUsersSubscription(UsersSubscription usersSubscription)
        {
            _context.UsersSubscriptions.Add(usersSubscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserSubscription", new { id = usersSubscription.Id }, usersSubscription);
        }

        // DELETE: api/UsersSubscriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsersSubscription(int id)
        {
            var usersSubscription = await _context.UsersSubscriptions.FindAsync(id);
            if (usersSubscription == null)
            {
                return NotFound();
            }

            _context.UsersSubscriptions.Remove(usersSubscription);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UsersSubscriptionExists(int id)
        {
            return _context.UsersSubscriptions.Any(e => e.Id == id);
        }
    }
}
