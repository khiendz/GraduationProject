using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IVideoService
    {
        string GetTwilioJwt(string identity);
        Task<IEnumerable<RoomDetails>> GetAllRoomsAsync();
    }
}
