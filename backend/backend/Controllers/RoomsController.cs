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
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpGet("GetRoomsByPlacement/placementId:{placementId}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByPlacement(int placementId)
        {
            var rooms = await _context.Rooms.Where(r => r.PlacementId == placementId).ToListAsync();
            if (!rooms.Any())
            {
                return NotFound();
            }
            return Ok(rooms);
        }

        [HttpGet("GetTopVisitedRoomsByPlacement/placementId:{placementId}")]
        public JsonResult GetNumberOfVisitsRoomsByPlacement(int placementId)
        {
            var numberOfVisitsOfAllRooms = SelectNumberOfVisitsRoomsByPlacement(placementId);
            return new JsonResult(numberOfVisitsOfAllRooms);
        }

        private object SelectNumberOfVisitsRoomsByPlacement(int placementId)
        {
            return _context.Actions
                .Where(x => x.PlacementId == placementId)
                .GroupBy(x => x.RoomInId)
                .Select(g => new { roomId = g.Key, count = g.Count() });
        }
        [HttpGet("GetNumberOfVisitsRoomByTimePeriod/roomId:{roomId}")]
        public JsonResult GetNumberOfVisitsRoomByTimePeriod(int roomId, TimePeriod timePeriod)
        {
            var numberOfVisitsRoomByTimePeriod = SelectNumberOfVisitsRoomByTimePeriod(roomId, timePeriod);
            return new JsonResult(numberOfVisitsRoomByTimePeriod);
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
            return result;
        }

        // PUT: api/Rooms/5
        [HttpPut("{id}")]
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
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            // Cascade delete sensors and actions
            DeleteSensorsByRoom(room.Id);
            DeleteActionsByRoom(room.Id);

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("placementId:{placementId}")]
        public async Task<IActionResult> DeleteRoomsByPlacement(int placementId)
        {
            var rooms = await _context.Rooms.Where(x => x.PlacementId == placementId).ToListAsync();

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
