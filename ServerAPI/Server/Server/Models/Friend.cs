using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Friend")]
    public class Friend
    {
        [Key]
        public string id { get; set; }
        public string name { get; set; }
        public string idAccount { get; set; }
        public string idFriend { get; set; }
        public string accept { get; set; }
    }
}
