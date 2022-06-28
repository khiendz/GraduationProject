using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entity
{
    public class FriendsResponse
    {
        public FriendsResponse()
        {
        }

        public FriendsResponse(Friend friend, Profile profile)
        {
            this.friend = friend;
            this.profile = profile;
        }

        public Friend friend { get; set; }
        public Profile profile { get; set; }
    }
}
