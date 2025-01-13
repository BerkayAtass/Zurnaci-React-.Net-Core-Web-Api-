using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZurnaciApi.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderItemRelationship1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Orders_OrderId1",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_OrderId1",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "OrderId1",
                table: "Items");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId1",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Items_OrderId1",
                table: "Items",
                column: "OrderId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Orders_OrderId1",
                table: "Items",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
