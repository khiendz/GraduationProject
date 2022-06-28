using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Server.Authentication;
using Server.Entity;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FriendsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Friends
        [HttpGet("Get/{idAcount}")]
        public async Task<IActionResult> Index(string idAcount)
        {
            var friends = await _context.Friends.Where(data => data.idAccount == idAcount).ToListAsync();
            var result = new List<FriendsResponse>();
            friends.ForEach( data =>
            {
                var objProfile = _context.Profiles.FirstOrDefault(data => data.idAccount == data.idAccount);
                var objResult = new FriendsResponse();
                objResult.friend = data;
                if (objProfile != null)
                {
                    objResult.profile = objProfile;
                }    
                result.Add(objResult);
            }
            );
            return Ok(new { Result = result });
        }

        // GET: Friends/Details/5
        [HttpGet("details/{idAcount}")]
        public async Task<IActionResult> Details(string idAccount)
        {
            if (idAccount == null)
            {
                return NotFound();
            }

            var friend = await _context.Friends
                .FirstOrDefaultAsync(m => m.idAccount == idAccount);
            if (friend == null)
            {
                return NotFound();
            }

            return Ok(friend);
        }

        // POST: Friends/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Friend friend)
        {
            if (ModelState.IsValid)
            {
                friend.id = Guid.NewGuid().ToString();
                _context.Add(friend);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(friend);
        }

        // POST: Friends/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit/{idAcount}")]
        public async Task<IActionResult> Edit(string idAccount, [FromBody] Friend friend)
        {
            if (idAccount != friend.idAccount)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(friend);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FriendExists(friend.idAccount))
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
            return Ok(friend);
        }

        // POST: Friends/Delete/5
        [HttpPost("Delete/{idAcount}")]
        public async Task<IActionResult> DeleteConfirmed(string idAccount)
        {
            var friend = await _context.Friends.FindAsync(idAccount);
            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpGet("Exist/{idAcount}")]
        private bool FriendExists(string idAccount)
        {
            return _context.Friends.Any(e => e.idAccount == idAccount);
        }
    }
}
