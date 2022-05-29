using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Friend
    {
        [Key]
        public string id { get; set; }
        public string name { get; set; }
        public string idAccount { get; set; }
    }
}
