using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZurnaciApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserOrderId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CartData",
                table: "Users",
                newName: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Users",
                newName: "CartData");
        }
    }
}
