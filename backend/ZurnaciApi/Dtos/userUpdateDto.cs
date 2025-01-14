using System.ComponentModel.DataAnnotations;

namespace ZurnaciApi.Dtos
{
    public class userUpdateDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        //[Required]
        //public string Password { get; set; }

        [Required]
        public bool isAdmin { get; set; }

        [Required]
        public int balance { get; set; } 
      
    }
}
