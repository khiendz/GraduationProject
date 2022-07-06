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
                return Ok(new { Result = "Created profile success" });
            }
            return Ok(new { Result = "Created profile fail" });
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
                return Ok(new { Result = "Update profile success" });
            }
            return Ok(new { Result = "Update profile fail" });
        }

        // POST: Profiles/Delete/5
        [HttpPost("delete/{idAccount}")]
        public async Task<IActionResult> DeleteConfirmed(string idAccount)
        {
            var profile = await _context.Profiles.FindAsync(idAccount);
            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();
            return Ok(new { Result = "Delete profile success" });
        }
        [HttpGet("Exits/{idAccount}")]
        private bool ProfileExists(string idAccount)
        {
            return _context.Profiles.Any(e => e.idAccount == idAccount);
        }

        [HttpGet("search/{name}")]
        public async Task<IActionResult> SearchProfile(string name)
        {
            if(name == null)
            {
                return Ok(new { Result = "Search Empty"});
            }

            var result = await _context.Profiles.Where(data => data.name.Contains(name) || data.idAccount.Contains(name) || data.location.Contains(name)).FirstOrDefaultAsync();
            if(result != null)
            {
                return Ok(new { Result = result });
            }
            else
            {
                var account =  _context.Accounts.Where(data => data.userName.Contains(name)).FirstOrDefault();
                if(account != null)
                {
                    result = _context.Profiles.Where(data => data.idAccount == account.idAccount).FirstOrDefault();

                    return Ok(new { Result = result });
                }else
                {
                    return Ok("There is no friend like Khien" + name);
                }    
            }
        }
    }
}
