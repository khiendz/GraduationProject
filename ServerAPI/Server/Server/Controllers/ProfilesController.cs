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
    public class ProfilesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Profiles
        [HttpGet("Get")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Profiles.ToListAsync());
        }

        // GET: Profiles/Details/5
        [HttpGet("details/{idAccount}")]
        public async Task<IActionResult> Details(string idAccount)
        {
            if (idAccount == null)
            {
                return NotFound();
            }

            var profile = await _context.Profiles
                .FirstOrDefaultAsync(m => m.idAccount == idAccount);
            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile);
        }

        // POST: Profiles/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Profile profile)
        {
            if (ModelState.IsValid)
            {
                profile.id = Guid.NewGuid().ToString();
                _context.Add(profile);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(profile);
        }

        // POST: Profiles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit/{idAccount}")]
        public async Task<IActionResult> Edit(string idAccount, [FromBody] Profile profile)
        {
            if (idAccount != profile.idAccount)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(profile);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProfileExists(profile.idAccount))
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
            return Ok(profile);
        }

        // POST: Profiles/Delete/5
        [HttpPost("delete/{idAccount}")]
        public async Task<IActionResult> DeleteConfirmed(string idAccount)
        {
            var profile = await _context.Profiles.FindAsync(idAccount);
            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        [HttpGet("Exits/{idAccount}")]
        private bool ProfileExists(string idAccount)
        {
            return _context.Profiles.Any(e => e.idAccount == idAccount);
        }
    }
}
