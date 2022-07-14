﻿using System;
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
    public class NewFeedsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public NewFeedsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: NewFeeds
        [HttpGet("Get/{idAccount}")]
        public async Task<IActionResult> Index(string idAccount)
        {
            var listFriend = _context.Friends.Where(data => data.idAccount == idAccount).ToList();
          
            var listNewFeeds = await _context.NewFeeds.OrderByDescending(x => x.datetimePost).Where(data => ((data.idAccount == idAccount) )).ToListAsync();
            listFriend.ForEach( data =>
            {
                var listNewFeedFriend = _context.NewFeeds.OrderByDescending(x => x.datetimePost).Where(content => ((content.idAccount == data.idFriend))).ToList();
                listNewFeeds.AddRange(listNewFeedFriend);
            });
            var result = new List<NewFeedsResponse>();
            listNewFeeds.ForEach(data =>
            {
                var objProfile = _context.Profiles.FirstOrDefault(profile => profile.idAccount == data.idAccount);
                var objResult = new NewFeedsResponse();
                objResult.newFeeds = data;
                if (objProfile != null)
                {
                    objResult.profile = objProfile;
                }
                result.Add(objResult);
            }
            );
            return Ok(new { Result = result });
        }

        // GET: NewFeeds
        [HttpGet("GetProfile/{idAccount}")]
        public async Task<IActionResult> GetWithProfile(string idAccount)
        {

            var listNewFeeds = await _context.NewFeeds.OrderByDescending(x => x.datetimePost).Where(data => ((data.idAccount == idAccount))).ToListAsync();
            var result = new List<NewFeedsResponse>();
            listNewFeeds.ForEach(data =>
            {
                var objProfile = _context.Profiles.FirstOrDefault(profile => profile.idAccount == data.idAccount);
                var objResult = new NewFeedsResponse();
                objResult.newFeeds = data;
                if (objProfile != null)
                {
                    objResult.profile = objProfile;
                }
                result.Add(objResult);
            }
            );
            return Ok(new { Result = result });
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
                return Ok(new { Result = "Create new feeds success" });
            }
            return Ok(new { Result = "Create new feeds fail" });
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
                return Ok(new { Result = "Update new feeds success" });
            }
            return Ok(newFeed);
        }

        // POST: NewFeeds/Delete/5
        [HttpGet("delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var newFeed = await _context.NewFeeds.FindAsync(id);
            _context.NewFeeds.Remove(newFeed);
            await _context.SaveChangesAsync();
            return Ok(new { Result = "Delete new feeds success" });
        }

        [HttpGet("exits/{id}")]
        private bool NewFeedExists(string id)
        {
            return _context.NewFeeds.Any(e => e.id == id);
        }
    }
}
