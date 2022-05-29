using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Account
    {
        [Key]
        public string idAccount { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}
