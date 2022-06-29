using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class NotifyHub : Hub
    {
        //public async Task RoomsUpdated(bool flag)
        //    => await Clients.Others.SendAsync("RoomsUpdated", flag);
    }
}
