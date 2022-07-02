using Microsoft.AspNetCore.SignalR;
using Server.Authentication;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class NotifyHub : Hub
    {
        private readonly ApplicationDbContext _context;
        public NotifyHub(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task Notifycation()
        {
            //msg.id = Guid.NewGuid().ToString();
            //await this._context.Messages.AddAsync(msg);
            //await this._context.SaveChangesAsync();
            //await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
