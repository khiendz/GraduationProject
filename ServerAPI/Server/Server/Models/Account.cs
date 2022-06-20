using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public string idAccount { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
    }
}
