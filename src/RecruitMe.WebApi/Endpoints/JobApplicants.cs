using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.CompanyReviews.Commands;
using RecruitMe.Application.JobApplicants.Commands.CreateJobApplicantCommand;
using RecruitMe.Application.JobApplicants.Queries.GetJobApplicantsByCompanyId;
using RecruitMe.Application.Jobs.Queries.GetDetailJobById;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class JobApplicants : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/jobapplicants")
            .MapPost("/createjobapplicant", CreateJobApplicant)
            .Produces<bool>(StatusCodes.Status201Created)
            .WithTags("JobApplicants");

        app.MapGroup("/api/jobapplicants")
            .MapGet("/getjobapplicantsbycompanyid/{companyId:guid}", GetJobApplicantsByCompanyId)
            .Produces<bool>(StatusCodes.Status201Created)
            .WithTags("JobApplicants");
    }



    private async Task<IResult> CreateJobApplicant([FromServices] ISender sender, [FromBody] CreateJobApplicantCommand command)
    {
        var jobApplicant = await sender.Send(command);
        return Results.Created($"/api/reviews/{jobApplicant}", jobApplicant);
    }

    private async Task<IResult> GetJobApplicantsByCompanyId([FromRoute] Guid companyId, [FromServices] ISender sender)
    {
        var query = new GetJobApplicantsByCompanyIdQuery() { CompanyId = companyId };
        var reviews = await sender.Send(query);
        return Results.Ok(reviews);
    }
}