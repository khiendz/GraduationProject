using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public record RoomDetails(
      string Id,
      string Name,
      int ParticipantCount,
      int MaxParticipants);
}
