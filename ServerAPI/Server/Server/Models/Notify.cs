using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Notify
    {
        [Key]
        public string id { get; set; }
        public string message { get; set; }
    }
}
