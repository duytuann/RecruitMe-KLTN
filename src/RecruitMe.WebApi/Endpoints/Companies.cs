using MediatR;
using RecruitMe.Application.Companies.Commands.RegisterCompany;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class Companies : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/companies")
            .MapPost("/register", RegisterCompany)
            .Produces<Guid>(StatusCodes.Status201Created)
            .WithTags("Companies");
    }

    public async Task<IResult> RegisterCompany(ISender sender, RegisterCompanyCommand command)
    {
        var companyId = await sender.Send(command);
        return Results.Created($"/api/companies/{companyId}", companyId);
    }
}
