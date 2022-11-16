using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmartDevicesController : ControllerBase
    {
        private readonly DBAtarkProjectContext _context;

        public SmartDevicesController(DBAtarkProjectContext context)
        {
            _context = context;
        }

        // GET: api/SmartDevices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmartDevice>>> GetSmartDevices()
        {
            return await _context.SmartDevices.ToListAsync();
        }

        // GET: api/SmartDevices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SmartDevice>> GetSmartDevice(int id)
        {
            var smartDevice = await _context.SmartDevices.FindAsync(id);

            if (smartDevice == null)
            {
                return NotFound();
            }

            return smartDevice;
        }

        [HttpGet("userId:{id}")]
        public async Task<ActionResult<IEnumerable<SmartDevice>>> GetSmartDevicesByUser(int id)
        {
            var smartDevices = await _context.SmartDevices
                .Where(x => x.UserId == id)
                .ToListAsync();

            if (smartDevices.Count == 0)
            {
                return NotFound();
            }

            return Ok(smartDevices);
        }

        [HttpGet("placementId:{id}")]
        public async Task<ActionResult<IEnumerable<SmartDevice>>> GetSmartDevicesByPlacement(int id)
        {
            var smartDevices = await _context.SmartDevices
                .Where(x => x.PlacementId == id)
                .ToListAsync();

            if (smartDevices == null)
            {
                return NotFound();
            }

            return smartDevices;
        }


        // PUT: api/SmartDevices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSmartDevice(int id, SmartDevice smartDevice)
        {
            if (id != smartDevice.Id)
            {
                return BadRequest();
            }

            _context.Entry(smartDevice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SmartDeviceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(smartDevice);
        }

        // POST: api/SmartDevices
        [HttpPost]
        public async Task<ActionResult<SmartDevice>> PostSmartDevice(SmartDevice smartDevice)
        {
            if (!placementExists(smartDevice.PlacementId))
            {
                return BadRequest("There are no placement with id: " + smartDevice.PlacementId);
            }
            _context.SmartDevices.Add(smartDevice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSmartDevice", new { id = smartDevice.Id }, smartDevice);
        }

        private bool placementExists(int placementId)
        {
            if (_context.Placements.Where(pl => pl.Id == placementId).Any())
            {
                return true;
            }
            return false;
        }

        // DELETE: api/SmartDevices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSmartDevice(int id)
        {
            var smartDevice = await _context.SmartDevices.FindAsync(id);
            if (smartDevice == null)
            {
                return NotFound();
            }

            _context.SmartDevices.Remove(smartDevice);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool SmartDeviceExists(int id)
        {
            return _context.SmartDevices.Any(e => e.Id == id);
        }
    }
}
