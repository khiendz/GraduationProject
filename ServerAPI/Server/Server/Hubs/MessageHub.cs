using Microsoft.AspNetCore.SignalR;
using Server.Authentication;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class MessageHub : Hub
    {
        private readonly ApplicationDbContext _context;
        public MessageHub(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task NewMessage(Message msg)
        {
            msg.id = Guid.NewGuid().ToString();
            await this._context.Messages.AddAsync(msg);
            await this._context.SaveChangesAsync();
            await Clients.All.SendAsync("MessageReceived", msg);
        }

        public async Task test()
        {
            Console.WriteLine("ádasdsad");
        }
    }
}
