using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ZurnaciApi.Models.OrderDetail;

namespace ZurnaciApi.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public List<Item> Items { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public Address Address { get; set; }

        public string Status { get; set; } = "Food Processing";

        public DateTime Date { get; set; } = DateTime.Now;

        public bool Payment { get; set; } = false;

    }
}
