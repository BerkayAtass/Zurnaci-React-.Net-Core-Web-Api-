using Microsoft.EntityFrameworkCore;
using ZurnaciApi.Models;
using ZurnaciApi.Models.OrderDetail;

namespace ZurnaciApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Address as an owned entity
            modelBuilder.Entity<Order>()
                .OwnsOne(o => o.Address); // This tells EF Core Address is part of Order

            // Configure the relationship between Order and Item
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)
                .WithOne() // No navigation property in Item for Order
                .HasForeignKey(i => i.OrderId) // Foreign key to Order
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete for items when order is deleted

          
            var adminUser = new User
            {
                Id = -1,
                Name = "admin",
                Email = "admin@admin.com",
                Password = BCrypt.Net.BCrypt.HashPassword("admin"), 
                isAdmin = true,
                balance = 10000,
                OrderId = new List<int>() 
            };

            modelBuilder.Entity<User>().HasData(adminUser);
        }
    }

}
