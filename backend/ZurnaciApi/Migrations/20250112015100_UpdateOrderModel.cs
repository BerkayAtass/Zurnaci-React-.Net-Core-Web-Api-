using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZurnaciApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrderModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Items",
                table: "Orders",
                newName: "Address_Zipcode");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Orders",
                newName: "Address_Street");

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Country",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Email",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_FirstName",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_LastName",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Phone",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_State",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    OrderId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Item_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Item_OrderId",
                table: "Item",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.DropColumn(
                name: "Address_City",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_Country",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_Email",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_FirstName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_LastName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_Phone",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Address_State",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Address_Zipcode",
                table: "Orders",
                newName: "Items");

            migrationBuilder.RenameColumn(
                name: "Address_Street",
                table: "Orders",
                newName: "Address");
        }
    }
}
