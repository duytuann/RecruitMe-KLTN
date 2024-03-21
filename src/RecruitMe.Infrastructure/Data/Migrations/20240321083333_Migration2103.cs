using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitMe.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration2103 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Companies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Companies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
