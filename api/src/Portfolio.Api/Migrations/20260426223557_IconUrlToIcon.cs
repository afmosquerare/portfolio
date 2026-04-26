using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Api.Migrations
{
    /// <inheritdoc />
    public partial class IconUrlToIcon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IconUrl",
                table: "Technologies",
                newName: "Icon");

            migrationBuilder.RenameColumn(
                name: "IconUrl",
                table: "Categories",
                newName: "Icon");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "Technologies",
                newName: "IconUrl");

            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "Categories",
                newName: "IconUrl");
        }
    }
}
