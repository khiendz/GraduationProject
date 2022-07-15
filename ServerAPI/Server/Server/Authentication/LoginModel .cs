using System.ComponentModel.DataAnnotations;
namespace Server.Authentication
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class ChangeModel
    {
        public string Email { get; set; }

        public string currentPassword { get; set; }

        public string newPassword { get; set; }
    }
}
