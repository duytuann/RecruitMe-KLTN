using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitMe.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration0309 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "UserSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "Skills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "JobSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "JobSeekers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "EndDate",
                table: "Jobs",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "NumberToHire",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "StartDate",
                table: "Jobs",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "CompanySkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "CompanyReviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateCode",
                table: "Companies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "UserSkills");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "JobSkills");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "JobSeekers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "NumberToHire",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "CompanySkills");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "CompanyReviews");

            migrationBuilder.DropColumn(
                name: "StateCode",
                table: "Companies");
        }
    }
}
