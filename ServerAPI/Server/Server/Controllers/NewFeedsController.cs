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
    public class NewFeedsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public NewFeedsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: NewFeeds
        [HttpGet("Get")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.NewFeeds.OrderByDescending(x => x.datetimePost).ToListAsync());
        }

        // GET: NewFeeds/Details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newFeed = await _context.NewFeeds
                .FirstOrDefaultAsync(m => m.id == id);
            if (newFeed == null)
            {
                return NotFound();
            }

            return Ok(newFeed);
        }

        // POST: NewFeeds/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] NewFeed newFeed)
        {
            if (ModelState.IsValid)
            {
                newFeed.id = Guid.NewGuid().ToString();
                _context.Add(newFeed);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(newFeed);
        }

        // POST: NewFeeds/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(string id, [FromBody] NewFeed newFeed)
        {
            if (id != newFeed.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(newFeed);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NewFeedExists(newFeed.id))
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
            return Ok(newFeed);
        }

        // POST: NewFeeds/Delete/5
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var newFeed = await _context.NewFeeds.FindAsync(id);
            _context.NewFeeds.Remove(newFeed);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpGet("exits/{id}")]
        private bool NewFeedExists(string id)
        {
            return _context.NewFeeds.Any(e => e.id == id);
        }
    }
}
