using MediatR;
using RecruitMe.Application.Jobs.Commands.CreateJobCommand;
using RecruitMe.Application.Jobs.Commands.DraftJobCommand;
using RecruitMe.Application.Jobs.Commands.SubmitJobCommand;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class Jobs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/jobs")
            .MapPost("/create", CreateJob)
            .Produces<Guid>(StatusCodes.Status201Created)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapPost("/draft", DraftJob)
            .Produces<Job>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapPost("/submit", SubmitJob)
            .Produces<Job>(StatusCodes.Status200OK)
            .WithTags("Jobs");
    }

    public async Task<IResult> CreateJob(ISender sender, CreateJobCommand command)
    {
        var jobId = await sender.Send(command);
        return Results.Created($"/api/jobs/{jobId}", jobId);
    }

    public async Task<IResult> DraftJob(ISender sender, DraftJobCommand command)
    {
        var jobDrafted = await sender.Send(command);
        return Results.Ok(jobDrafted);
    }

    public async Task<IResult> SubmitJob(ISender sender, SubmitJobCommand command)
    {
        var jobSubmittedId = await sender.Send(command);
        return Results.Ok(jobSubmittedId);
    }
}
