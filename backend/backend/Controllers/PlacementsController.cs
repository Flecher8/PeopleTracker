using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacementsController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public PlacementsController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/Placements
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Placement>>> GetPlacements()
        {
            return await _context.Placements.ToListAsync();
        }

        // GET: api/Placements/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Placement>> GetPlacement(int id)
        {
            var placement = await _context.Placements.FindAsync(id);

            if (placement == null)
            {
                return NotFound();
            }

            return placement;
        }

        [HttpGet("userId:{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Placement>>> GetPlacementsByUser(int id)
        {
            var placements = await _context.Placements.Where(x => x.UserId == id).ToListAsync();
            if(!placements.Any())
            {
                return NotFound();
            }
            return Ok(placements);
        }

        [HttpGet("GetNumberOfVisitsPlacementByTimePeriod/placementId:{id}")]
        [Authorize]
        public JsonResult GetNumberOfVisitsPlacementByTimePeriod(int id, TimePeriod timePeriod)
        {
            var result = SelectNumberOfPeopleVisitedPlacementByTimePeriod(id, timePeriod);
            return new JsonResult(result);
        }

        private object SelectNumberOfPeopleVisitedPlacementByTimePeriod(int placementId, TimePeriod timePeriod)
        {
            var result = from a in _context.Actions
                         join r in _context.Rooms on a.RoomOutId equals r.Id
                         where a.DateTime >= timePeriod.StartDateTime
                         where a.DateTime <= timePeriod.EndDateTime 
                         where r.IsExit
                         where a.PlacementId == placementId
                         group a by a.PlacementId into g
                         select new { PlacementId = g.Key, Count = g.Count() };               
            return result;
        }

        // PUT: api/Placements/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutPlacement(int id, Placement placement)
        {
            if (id != placement.Id)
            {
                return BadRequest();
            }

            _context.Entry(placement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlacementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(placement);
        }

        // POST: api/Placements
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Placement>> PostPlacement(Placement placement)
        {
            _context.Placements.Add(placement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlacement", new { id = placement.Id }, placement);
        }

        private bool PlacementExists(int id)
        {
            return _context.Placements.Any(e => e.Id == id);
        }
    }
}
