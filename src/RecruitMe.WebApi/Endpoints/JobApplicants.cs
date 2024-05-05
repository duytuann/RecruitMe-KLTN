using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.CompanyReviews.Commands;
using RecruitMe.Application.JobApplicants.Commands.CreateJobApplicantCommand;
using RecruitMe.Application.JobApplicants.Queries.GetJobApplicantsByCompanyId;
using RecruitMe.Application.Jobs.Queries.GetDetailJobById;
using RecruitMe.Application.Jobs.Queries.GetListJobByUserId;
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
            .MapGet("/getjobapplicantsbycompanyid/{companyId:guid}/{jobApplicantStatus:int}", GetJobApplicantsByCompanyId)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("JobApplicants");

        app.MapGroup("/api/jobapplicants")
            .MapPost("/approvejobapplicant", ApproveJobApplicant)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("JobApplicants");

        app.MapGroup("/api/jobapplicants")
            .MapPost("/rejectjobapplicant", RejectJobApplicant)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("JobApplicants");
    }



    private async Task<IResult> CreateJobApplicant([FromServices] ISender sender, [FromBody] CreateJobApplicantCommand command)
    {
        var jobApplicant = await sender.Send(command);
        return Results.Created($"/api/reviews/{jobApplicant}", jobApplicant);
    }

    private async Task<IResult> GetJobApplicantsByCompanyId([FromRoute] Guid companyId, [FromRoute] int jobApplicantStatus, ISender sender)
    {
        var query = new GetJobApplicantsByCompanyIdQuery()
        {
            CompanyId = companyId,
            Status = jobApplicantStatus
        };
        var reviews = await sender.Send(query);
        return Results.Ok(reviews);
    }

    private async Task<IResult> ApproveJobApplicant([FromServices] ISender sender, [FromBody] ApproveJobApplicantCommand command)
    {
        var result = await sender.Send(command);
        if (result)
            return Results.Ok(result);
        else
            return Results.NotFound("Job applicant not found.");
    }

    private async Task<IResult> RejectJobApplicant([FromServices] ISender sender, [FromBody] RejectJobApplicantCommand command)
    {
        var result = await sender.Send(command);
        if (result)
            return Results.Ok(result);
        else
            return Results.NotFound("Job applicant not found.");
    }
}