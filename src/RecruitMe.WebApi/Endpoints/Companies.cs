using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.Companies.Commands.RegisterCompany;
using RecruitMe.Application.Companies.Queries.GetDetailCompanyById;
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

        app.MapGroup("/api/companies")
           .MapGet("/{userId:guid}", GetDetailCompanyById)
           .Produces<CompanyDetailVm>(StatusCodes.Status200OK)
           .WithTags("Companies");
    }

    public async Task<IResult> RegisterCompany([FromServices] ISender sender, RegisterCompanyCommand command)
    {
        var companyId = await sender.Send(command);
        return Results.Created($"/api/companies/{companyId}", companyId);
    }

    public async Task<IResult> GetDetailCompanyById([FromRoute] Guid userId, [FromServices] ISender sender)
    {
        var query = new GetCompanyDetailQuery { Id = userId };
        var result = await sender.Send(query);
        return Results.Ok(result);
    }
}
