using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost("GetNumberOfPeopleVisitedPlacementByDayInHours/placementId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetNumberOfPeopleVisitedPlacementByDayInHours(int id, TimePeriod timePeriod)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            int addFirstStartPeriodTime = 8;
            int addSecondStartPeriodTime = 9;
            const int numberOfHoursToFind = 12;
            
            for(int i = 0; i < numberOfHoursToFind; i++)
            {
                DateTime date1 = timePeriod.StartDateTime.AddHours(addFirstStartPeriodTime);
                DateTime date2 = timePeriod.StartDateTime.AddHours(addSecondStartPeriodTime);
                addFirstStartPeriodTime++;
                addSecondStartPeriodTime++;

                string key = date1.ToString("HH") + "-" + date2.ToString("HH");
                TimePeriod newTimePeriod = new TimePeriod();
                newTimePeriod.StartDateTime = date1;
                newTimePeriod.EndDateTime = date2.AddSeconds(-1);
                object value = SelectNumberOfPeopleVisitedPlacementByTimePeriod(id, newTimePeriod);

                result.Add(key, value);
            }

            return Ok(new JsonResult(result));
        }

        [HttpPost("GetAvgVisitsPlacementByTimePeriod/placementId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetAvgVisitsPlacementByTimePeriod(int id, TimePeriod timePeriod)
        {
            var result = SelectNumberOfPeopleVisitedPlacementByTimePeriod(id, timePeriod);
            TimeSpan differenceBetweenDates = timePeriod.EndDateTime - timePeriod.StartDateTime;
            if (differenceBetweenDates.Days == 0)
            {
                return BadRequest("Difference between dates must be more than one day");
            }
            if (result == null)
            {
                result = new VisitsResponse { ItemId = id, Count = 0 };
            }
           
            return Ok(new JsonResult(new { result, differenceBetweenDates.Days }));
        }

        [HttpPost("GetNumberOfVisitsPlacementByTimePeriod/placementId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetNumberOfVisitsPlacementByTimePeriod(int id, TimePeriod timePeriod)
        {
            var result = SelectNumberOfPeopleVisitedPlacementByTimePeriod(id, timePeriod);
            if(result == null)
            {
                result = new { PlacementId = id, Count = 0 };
            }
            return Ok(new JsonResult(new { result }));
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
                         select new { ItemId = g.Key, Count = g.Count() };               
            return result.FirstOrDefault();
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

        // DELETE: api/Placement/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePlacement(int id)
        {
            var placement = await _context.Placements.FindAsync(id);
            if (placement == null)
            {
                return NotFound();
            }

            _context.Placements.Remove(placement);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PlacementExists(int id)
        {
            return _context.Placements.Any(e => e.Id == id);
        }
    }
}
