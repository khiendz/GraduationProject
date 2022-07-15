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
    public class NotifiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public NotifiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Notifies
        [HttpGet("Get/{idAccount}")]
        public async Task<IActionResult> Index(string idAccount)
        {
            return Ok(await _context.Notifys.Where(data => data.idfromTo == idAccount).OrderByDescending(order => order.date).ToListAsync());
        }

        // GET: Notifies/Details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var notify = await _context.Notifys
                .FirstOrDefaultAsync(m => m.id == id);
            if (notify == null)
            {
                return NotFound();
            }

            return Ok(notify);
        }

        // GET: Notifies/Details/5
        [HttpGet("check/{idNotify}")]
        public async Task<IActionResult> Check(string idNotify)
        {
            if (idNotify == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var obj = _context.Notifys.Where(data => data.id == idNotify).FirstOrDefault();
                    obj._check = true;
                    _context.Notifys.Update(obj);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NotifyExists(idNotify))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(new { Result = "Update notify success" });
            }
            return Ok(new { Result = "Update notify fail" });
        }

        // POST: Notifies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Notify notify)
        {
            if (ModelState.IsValid)
            {
                notify.id = Guid.NewGuid().ToString();
                _context.Add(notify);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(notify);
        }

        // POST: Notifies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(string id, [FromBody] Notify notify)
        {
            if (id != notify.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(notify);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NotifyExists(notify.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Ok(notify);
        }

        // POST: Notifies/Delete/5
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var notify = await _context.Notifys.FindAsync(id);
            _context.Notifys.Remove(notify);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpGet("exits/{id}")]
        private bool NotifyExists(string id)
        {
            return _context.Notifys.Any(e => e.id == id);
        }
    }
}
