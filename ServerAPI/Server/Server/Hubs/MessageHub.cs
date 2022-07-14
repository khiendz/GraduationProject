using Microsoft.AspNetCore.SignalR;
using Server.Authentication;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public static class UserHandler
    {
        public static List<Connect> ConnectedIds = new List<Connect>();
    }

    public class Connect
    {

        public Connect()
        {

        }

        public Connect(string idAccount, string userName)
        {
            this.idAccount = idAccount;
            this.userName = userName;
        }

        public string idAccount { get; set; }
        public string userName { get; set; }
    }

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

        public async Task Connected(Connect connect)
        {
            var checkUser = UserHandler.ConnectedIds.Find(_connect => _connect.idAccount == connect.idAccount);
            if (checkUser != null)
            {
                await Clients.All.SendAsync("ConnectStart", UserHandler.ConnectedIds);
                return;
            }    
            UserHandler.ConnectedIds.Add(connect);
            await Clients.All.SendAsync("ConnectStart", UserHandler.ConnectedIds);
        }

        public async Task Disconnected(Connect connect)
        {
            var checkUser = UserHandler.ConnectedIds.Find(_connect => _connect.idAccount == connect.idAccount);
            if (checkUser == null)
            {
                await Clients.All.SendAsync("Disconnect", UserHandler.ConnectedIds);
                return;
            }    
            UserHandler.ConnectedIds.Remove(checkUser);
            await Clients.All.SendAsync("Disconnect", UserHandler.ConnectedIds);
        }

    }
}
