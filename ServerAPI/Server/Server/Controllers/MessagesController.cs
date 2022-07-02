using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Server.Authentication;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MessagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Messages
        [HttpGet("Get")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Messages.ToListAsync());
        }

        // GET: Messages
        [HttpGet("GetListMessage/{name}/{clientTo}")]
        public async Task<IActionResult> GetListMessage(string name, string clientTo)
        {
            return Ok(await _context.Messages.Where(data => (data.clientTo == clientTo && data.clientuniqueid == name) || (data.clientTo == name && data.clientuniqueid == clientTo) ).ToListAsync());
        }

        // GET: Messages/Details/5
        [HttpGet("Details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var message = await _context.Messages
                .FirstOrDefaultAsync(m => m.clientuniqueid == id);
            if (message == null)
            {
                return NotFound();
            }

            return Ok(message);
        }

        // POST: Messages/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Message message)
        {
            if (ModelState.IsValid)
            {
                message.clientuniqueid = Guid.NewGuid().ToString();
                _context.Add(message);
                await _context.SaveChangesAsync();
                return Ok(new { Result = "Send message success" });
            }
            return Ok(new { Result = "Fail" });
        }

        // POST: Messages/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(string id, [FromBody] Message message)
        {
            if (id != message.clientuniqueid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(message);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MessageExists(message.clientuniqueid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(new { Result = "Update message success" });
            }
            return Ok(message);
        }

        // POST: Messages/Delete/5
        [HttpPost, ActionName("Delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var message = await _context.Messages.FindAsync(id);
            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
            return Ok(new { Result = "Delete message success" });
        }

        [HttpGet("exists/{id}")]
        private bool MessageExists(string id)
        {
            return _context.Messages.Any(e => e.clientuniqueid == id);
        }
    }
}
