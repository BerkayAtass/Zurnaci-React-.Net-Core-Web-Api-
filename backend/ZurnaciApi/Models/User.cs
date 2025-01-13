using System.ComponentModel.DataAnnotations;

namespace ZurnaciApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool isAdmin { get; set; } = false;

        [Required]
        public int balance { get; set; } = 10000;
        public List<int> OrderId { get; set; } = new List<int>();
    }
}
