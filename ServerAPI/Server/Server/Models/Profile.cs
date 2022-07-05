using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("Profile")]
    public class Profile
    {
        public Profile()
        {
        }

        public Profile(string id, string idAccount, string name)
        {
            this.id = id;
            this.idAccount = idAccount;
            this.name = name;
        }

        public Profile(string id, string avartar, string name, string date, string sex, string age, string location, string idAccount)
        {
            this.id = id;
            this.avatar = avartar;
            this.name = name;
            this.date = date;
            this.sex = sex;
            this.age = age;
            this.location = location;
            this.idAccount = idAccount;
        }

        [Key]
        public string id { get; set; }
        public string avatar { get; set; }
        public string name { get; set; }
        public string date { get; set; }
        public string sex { get; set; }
        public string age { get; set; }
        public string location { get; set; }
        public string idAccount { get; set; }
    }
}
