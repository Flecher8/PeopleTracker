using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using Action = backend.Data.Action;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public RoomsController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpGet("GetRoomsByPlacement/placementId:{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByPlacement(int id)
        {
            var rooms = await _context.Rooms.Where(r => r.PlacementId == id && !r.IsExit).ToListAsync();
            if (!rooms.Any())
            {
                return NotFound();
            }
            return Ok(rooms);
        }

        [HttpPost("GetAvgVisitsRoomByTimePeriod/roomId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetAvgVisitsPlacementByTimePeriod(int id, TimePeriod timePeriod)
        {
            var result = SelectNumberOfVisitsRoomByTimePeriod(id, timePeriod);
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

        [HttpPost("GetVisitsInRoomsByPlacement/placementId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetNumberOfVisitsRoomsByPlacement(int id, TimePeriod timePeriod)
        {
            var numberOfVisitsOfAllRooms = SelectNumberOfVisitsRoomsByPlacement(id, timePeriod);
            return Ok(new JsonResult(numberOfVisitsOfAllRooms));
        }

        private object SelectNumberOfVisitsRoomsByPlacement(int placementId, TimePeriod timePeriod)
        {
            return       from a in _context.Actions
                         join r in _context.Rooms on a.RoomInId equals r.Id
                         where a.DateTime >= timePeriod.StartDateTime
                         where a.DateTime <= timePeriod.EndDateTime
                         where a.PlacementId == placementId
                         where !r.IsExit
                         group a by a.RoomInId into g
                         select new { RoomInId = g.Key, Count = g.Count() };
        }
        [HttpPost("GetNumberOfVisitsRoomByTimePeriod/roomId:{id}")]
        [Authorize]
        public async Task<IActionResult> GetNumberOfVisitsRoomByTimePeriod(int id, TimePeriod timePeriod)
        {
            var result = SelectNumberOfVisitsRoomByTimePeriod(id, timePeriod);
            if (result == null)
            {
                result = new { RoomId = id, Count = 0 };
            }
            return Ok(new JsonResult( new { result }));
        }

        private object SelectNumberOfVisitsRoomByTimePeriod(int roomId, TimePeriod timePeriod)
        {
            var result = from a in _context.Actions
                         join r in _context.Rooms on a.RoomInId equals r.Id
                         where a.DateTime >= timePeriod.StartDateTime
                         where a.DateTime <= timePeriod.EndDateTime
                         where a.RoomInId == roomId
                         group a by a.RoomInId into g
                         select new { RoomInId = g.Key, Count = g.Count() };
            return result.FirstOrDefault();
        }

        // PUT: api/Rooms/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.Id)
            {
                return BadRequest();
            }

            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(room);
        }

        // POST: api/Rooms
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            if (!placementExists(room.PlacementId))
            {
                return BadRequest("There are no placement with id: " + room.PlacementId);
            }

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }

        private bool placementExists(int placementId)
        {
            if (_context.Placements.Where(pl => pl.Id == placementId).Any())
            {
                return true;
            }
            return false;
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            // Cascade delete sensors and actions
            await DeleteSensorsByRoom(room.Id);
            await DeleteActionsByRoom(room.Id);

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("placementId:{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoomsByPlacement(int id)
        {
            var rooms = await _context.Rooms.Where(x => x.PlacementId == id).ToListAsync();

            if (!rooms.Any())
            {
                return NotFound();
            }

            foreach(var room in rooms)
            {
                // Cascade delete sensors and actions
                await DeleteSensorsByRoom(room.Id);
                await DeleteActionsByRoom(room.Id);

                _context.Rooms.Remove(room);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool RoomExists(int id)
        {
            return _context.Rooms.Any(e => e.Id == id);
        }

        private async Task DeleteSensorsByRoom(int roomId)
        {
            var sensors = await _context.Sensors
                .Where(x => x.LeftRoomId == roomId || x.RightRoomId == roomId)
                .ToListAsync();
            
            foreach (var sensor in sensors)
            {
                _context.Sensors.Remove(sensor);
            }
            await _context.SaveChangesAsync();
        }
        private async Task DeleteActionsByRoom(int roomId)
        {
            var actions = await _context.Actions
                .Where(x => x.RoomInId == roomId || x.RoomOutId == roomId)
                .ToListAsync();

            foreach(var action in actions)
            {
                _context.Actions.Remove(action);
            }
            await _context.SaveChangesAsync();
        }
    }
}
