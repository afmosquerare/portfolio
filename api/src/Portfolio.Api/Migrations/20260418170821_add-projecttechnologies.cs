using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Api.Migrations
{
    /// <inheritdoc />
    public partial class addprojecttechnologies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTechnology_Projects_ProjectsId",
                table: "ProjectTechnology");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTechnology_Technologies_TechnologiesId",
                table: "ProjectTechnology");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTechnology",
                table: "ProjectTechnology");

            migrationBuilder.RenameTable(
                name: "ProjectTechnology",
                newName: "ProjectTechnologies");

            migrationBuilder.RenameColumn(
                name: "TechnologiesId",
                table: "ProjectTechnologies",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "ProjectsId",
                table: "ProjectTechnologies",
                newName: "TechnologyId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTechnology_TechnologiesId",
                table: "ProjectTechnologies",
                newName: "IX_ProjectTechnologies_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTechnologies",
                table: "ProjectTechnologies",
                columns: new[] { "TechnologyId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTechnologies_Projects_ProjectId",
                table: "ProjectTechnologies",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTechnologies_Technologies_TechnologyId",
                table: "ProjectTechnologies",
                column: "TechnologyId",
                principalTable: "Technologies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTechnologies_Projects_ProjectId",
                table: "ProjectTechnologies");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTechnologies_Technologies_TechnologyId",
                table: "ProjectTechnologies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTechnologies",
                table: "ProjectTechnologies");

            migrationBuilder.RenameTable(
                name: "ProjectTechnologies",
                newName: "ProjectTechnology");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "ProjectTechnology",
                newName: "TechnologiesId");

            migrationBuilder.RenameColumn(
                name: "TechnologyId",
                table: "ProjectTechnology",
                newName: "ProjectsId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTechnologies_ProjectId",
                table: "ProjectTechnology",
                newName: "IX_ProjectTechnology_TechnologiesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTechnology",
                table: "ProjectTechnology",
                columns: new[] { "ProjectsId", "TechnologiesId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTechnology_Projects_ProjectsId",
                table: "ProjectTechnology",
                column: "ProjectsId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTechnology_Technologies_TechnologiesId",
                table: "ProjectTechnology",
                column: "TechnologiesId",
                principalTable: "Technologies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
