using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using Action = backend.Data.Action;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public ActionsController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Action>>> GetActions()
        {
            return await _context.Actions.ToListAsync();
        }

        // GET: api/Actions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Action>> GetAction(int id)
        {
            var action = await _context.Actions.FindAsync(id);

            if (action == null)
            {
                return NotFound();
            }

            return action;
        }

        // PUT: api/Actions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAction(int id, Action action)
        {
            if (id != action.Id)
            {
                return BadRequest();
            }

            _context.Entry(action).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(action);
        }

        // POST: api/Actions
        [HttpPost]
        public async Task<ActionResult<Action>> PostAction(Action action)
        {
            _context.Actions.Add(action);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAction", new { id = action.Id }, action);
        }

        // DELETE: api/Actions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAction(int id)
        {
            var action = await _context.Actions.FindAsync(id);
            if (action == null)
            {
                return NotFound();
            }

            _context.Actions.Remove(action);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("placementId:{id}")]
        public async Task<IActionResult> DeleteActionByPlacement(int id)
        {
            var actions = await _context.Actions
                .Where(action => action.PlacementId == id)
                .ToListAsync();

            if (actions == null)
            {
                return NotFound();
            }

            foreach(var action in actions)
            {
                _context.Actions.Remove(action);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("roomId:{id}")]
        public async Task<IActionResult> DeleteActionByRoom(int id)
        {
            var actions = await _context.Actions
                .Where(action => action.RoomInId == id || action.RoomOutId == id)
                .ToListAsync();

            if (actions == null)
            {
                return NotFound();
            }

            foreach (var action in actions)
            {
                _context.Actions.Remove(action);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ActionExists(int id)
        {
            return _context.Actions.Any(action => action.Id == id);
        }
    }
}
