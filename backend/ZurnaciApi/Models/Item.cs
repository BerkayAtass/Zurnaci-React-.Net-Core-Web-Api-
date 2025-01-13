using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace ZurnaciApi.Models
{
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Otomatik artırılmasını sağlar
        public int Id { get; set; }

        public int OrderId { get; set; }
        public int FoodId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
    }
}
