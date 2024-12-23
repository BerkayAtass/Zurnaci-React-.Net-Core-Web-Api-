using System.ComponentModel.DataAnnotations;

namespace ZurnaciApi.Models
{
    public class Food
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Category { get; set; }

    }
}
