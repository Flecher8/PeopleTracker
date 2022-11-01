using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;
using Action = backend.Data.Action;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Security.Policy;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Channels;
using Channel = backend.Model.Channel;
using Microsoft.DotNet.MSIdentity.Shared;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

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

        //TEST FUNCTION !!!
        [HttpGet("Arduino")]
        public async Task<ActionResult<Action>> PostActionArduino(int RoomIdIn, int RoomIdOut)
        {
            Action action = new Action();
            action.PlacementId = 1;
            action.DateTime = DateTime.Now;
            action.RoomInId = RoomIdIn;
            action.RoomOutId = RoomIdOut;

            _context.Actions.Add(action);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAction", new { id = action.Id }, action);
        }

        [HttpGet("fields")]
        public async Task<JsonResult> GetFields()
        {
            string url = "https://api.thingspeak.com/channels/1908852/feeds.json?results=2";
            HttpResponseMessage response = await client.GetAsync(url);
            string responseBody = await response.Content.ReadAsStringAsync();

            Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(responseBody);


            return new JsonResult(myDeserializedClass);
        }

        // PUT: api/Actions/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
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

        private bool ActionExists(int id)
        {
            return _context.Actions.Any(e => e.Id == id);
        }

        // DELETE: api/Actions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
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
    }
}
