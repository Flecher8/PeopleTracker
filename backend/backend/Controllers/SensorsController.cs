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
    public class SensorsController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public SensorsController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/Sensors
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensors()
        {
            return await _context.Sensors.ToListAsync();
        }

        // GET: api/Sensors/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Sensor>> GetSensor(int id)
        {
            var sensor = await _context.Sensors.FindAsync(id);

            if (sensor == null)
            {
                return NotFound();
            }

            return sensor;
        }
        // Scaffold-DbContext "Server=.\SQLExpress;Database=SchoolDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
        [HttpGet("smartDeviceId:{id}")]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensorsBySmartDevice(int id)
        {
            var sensors = await _context.Sensors.Where(sensor => sensor.SmartDeviceId == id).ToListAsync();
            if(!sensors.Any())
            {
                return NotFound();
            }

            return Ok(sensors);
        }

        // PUT: api/Sensors/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutSensor(int id, Sensor sensor)
        {
            if (id != sensor.Id)
            {
                return BadRequest();
            }

            _context.Entry(sensor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(sensor);
        }

        // POST: api/Sensors
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Sensor>> PostSensor(Sensor sensor)
        {
            _context.Sensors.Add(sensor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSensor", new { id = sensor.Id }, sensor);
        }

        // DELETE: api/Sensors/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSensor(int id)
        {
            var sensor = await _context.Sensors.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            _context.Sensors.Remove(sensor);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("roomId:{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSensorsByRoom(int id)
        {
            var sensors = await _context.Sensors
                .Where(sensor => sensor.LeftRoomId == id || sensor.RightRoomId == id)
                .ToListAsync();

            if (sensors == null)
            {
                return NotFound();
            }

            foreach (var sensor in sensors)
            {
                _context.Sensors.Remove(sensor);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }
        // TODO 
        // DELETE ACTIONS BY SENSOR
        private bool SensorExists(int id)
        {
            return _context.Sensors.Any(sensor => sensor.Id == id);
        }
    }
}
