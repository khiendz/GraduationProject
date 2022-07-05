using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Notify")]
    public class Notify
    {
        [Key]
        public string id { get; set; }
        public string message { get; set; }
        public string idAccount { get; set; }
        public string idfromTo { get; set; }
    }
}
