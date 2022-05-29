using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Profile
    {
        [Key]
        public string id { get; set; }
        public string avartart { get; set; }
        public string name { get; set; }
        public string date { get; set; }
        public string sex { get; set; }
        public string age { get; set; }
        public string location { get; set; }
        public string idAccount { get; set; }
    }
}
