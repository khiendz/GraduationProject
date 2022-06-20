using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("NewFeed")]
    public class NewFeed
    {
        [Key]
        public string id { get; set; }
        public string content { get; set; }
        public DateTime datetimePost { get; set; }
        public string idAccount { get; set; }
    }
}
