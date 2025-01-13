using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZurnaciApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrderModel3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Item",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Item");
        }
    }
}
