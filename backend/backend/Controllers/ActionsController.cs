using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using Action = backend.Data.Action;
using Microsoft.AspNetCore.Authorization;
using System.Data;

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
        [Authorize]
        public async Task<ActionResult<IEnumerable<Action>>> GetActions()
        {
            return await _context.Actions.ToListAsync();
        }

        // GET: api/Actions/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Action>> GetAction(int id)
        {
            var action = await _context.Actions.FindAsync(id);

            if (action == null)
            {
                return NotFound();
            }

            return action;
        }

        // POST: api/Actions
        [HttpPost]
        public async Task<ActionResult<Action>> PostAction(Action action)
        {
            _context.Actions.Add(action);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAction", new { id = action.Id }, action);
        }

        [HttpDelete("placementId:{id}")]
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
