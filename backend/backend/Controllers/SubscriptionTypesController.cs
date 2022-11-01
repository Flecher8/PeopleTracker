using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionTypesController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public SubscriptionTypesController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/SubscriptionTypes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<SubscriptionType>>> GetSubscriptionTypes()
        {
            return await _context.SubscriptionTypes.ToListAsync();
        }

        // GET: api/SubscriptionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionType>> GetSubscriptionType(int id)
        {
            var subscriptionType = await _context.SubscriptionTypes.FindAsync(id);

            if (subscriptionType == null)
            {
                return NotFound();
            }

            return subscriptionType;
        }

        // PUT: api/SubscriptionTypes/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutSubscriptionType(int id, SubscriptionType subscriptionType)
        {
            if (id != subscriptionType.Id)
            {
                return BadRequest();
            }

            _context.Entry(subscriptionType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(subscriptionType);
        }

        // POST: api/SubscriptionTypes
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SubscriptionType>> PostSubscriptionType(SubscriptionType subscriptionType)
        {
            _context.SubscriptionTypes.Add(subscriptionType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SubscriptionTypeExists(subscriptionType.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSubscriptionType", new { id = subscriptionType.Id }, subscriptionType);
        }

        // DELETE: api/SubscriptionTypes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSubscriptionType(int id)
        {
            var subscriptionType = await _context.SubscriptionTypes.FindAsync(id);
            if (subscriptionType == null)
            {
                return NotFound();
            }

            _context.SubscriptionTypes.Remove(subscriptionType);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool SubscriptionTypeExists(int id)
        {
            return _context.SubscriptionTypes.Any(e => e.Id == id);
        }
    }
}
