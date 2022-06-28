using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Message")]
    public class Message
    {
        public Message()
        {
        }

        public Message(string clientuniqueid, string type, string message, string clientTo, DateTime date)
        {
            this.id = Guid.NewGuid().ToString();
            this.clientuniqueid = clientuniqueid;
            this.type = type;
            this.message = message;
            this.clientTo = clientTo;
            this.date = date;
        }

        [Key]
        public string id { get; set; }
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public string clientTo { get; set; }
        public DateTime date { get; set; }
    }
}
