using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitMe.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration0421 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "CompanyReviews",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Review",
                table: "CompanyReviews",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "CompanyReviews");

            migrationBuilder.DropColumn(
                name: "Review",
                table: "CompanyReviews");
        }
    }
}
