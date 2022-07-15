using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entity
{
    public class CallRequest
    {
        public Profile fromUser { get; set; }
        public string toUser { get; set; }
        public string roomName { get; set; }
    }
}
