using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitMe.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration2803 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberToHire",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "Jobs",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Jobs",
                newName: "PhoneNumber");

            migrationBuilder.AlterColumn<int>(
                name: "JobType",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "JobApplyEmail",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaxSalary",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MinSalary",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SalaryType",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobApplyEmail",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "MaxSalary",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "MinSalary",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalaryType",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "Jobs",
                newName: "Salary");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Jobs",
                newName: "Address");

            migrationBuilder.AlterColumn<int>(
                name: "JobType",
                table: "Jobs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "NumberToHire",
                table: "Jobs",
                type: "int",
                nullable: true);
        }
    }
}
