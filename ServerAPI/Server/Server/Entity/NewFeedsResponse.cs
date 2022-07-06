using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Entity
{
    public class NewFeedsResponse
    {
        public NewFeedsResponse()
        {
        }

        public NewFeedsResponse(NewFeed newFeeds, Profile profile)
        {
            this.newFeeds = newFeeds;
            this.profile = profile;
        }

        public NewFeed newFeeds { get; set; }
        public Profile profile { get; set; }
    }
}
