using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UpHealth.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVaccinationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DoseNumber",
                table: "Vaccinations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoseNumber",
                table: "Vaccinations");
        }
    }
}
