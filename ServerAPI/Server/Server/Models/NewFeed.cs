using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class NewFeed
    {
        [Key]
        public string id { get; set; }
        public string content { get; set; }
        public DateTime datetimePost { get; set; }
        public string idAccount { get; set; }
    }
}
