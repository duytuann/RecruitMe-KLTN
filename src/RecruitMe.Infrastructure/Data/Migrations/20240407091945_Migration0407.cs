using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitMe.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration0407 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "JobSeekers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "JobSeekers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoleTitle",
                table: "JobSeekers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "JobSeekers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserLookupName",
                table: "JobSeekers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "JobSeekers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "JobSeekers");

            migrationBuilder.DropColumn(
                name: "RoleTitle",
                table: "JobSeekers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "JobSeekers");

            migrationBuilder.DropColumn(
                name: "UserLookupName",
                table: "JobSeekers");
        }
    }
}
