using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.JobSeekers.Commands.RegisterJobSeeker;
using RecruitMe.Application.JobSeekers.Commands.UpdateJobSeekerLogo;
using RecruitMe.Application.JobSeekers.Commands.UpdateJobSeekerProfile;
using RecruitMe.Application.JobSeekers.Queries.GetJobSeekerDetailById;
using RecruitMe.Domain.Common;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class JobSeekers : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/jobseekers")
            .MapPost("/register", RegisterJobSeeker)
            .Produces<Guid>(StatusCodes.Status201Created)
            .WithTags("JobSeekers");

        app.MapGroup("/api/jobseekers")
            .MapPost("/updatejobseekerprofile", UpdateJobSeekerProfile)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("JobSeekers");

        app.MapGroup("/api/jobseekers")
            .MapGet("/getjobseekerdetailbyid/{userId:guid}", GetJobSeekerDetailById)
            .Produces<JobSeeker>(StatusCodes.Status200OK)
            .WithTags("JobSeekers");

        app.MapGroup("/api/jobseekers")
            .MapPost("/updatejobseekerlogo", UpdateJobSeekerLogo)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("JobSeekers");
    }

    public async Task<IResult> RegisterJobSeeker(ISender sender, RegisterJobSeekerCommand command)
    {
        var jobSeekerId =  await sender.Send(command);
        return Results.Created($"/api/jobseekers/{jobSeekerId}", jobSeekerId);
    }

    public async Task<IResult> UpdateJobSeekerProfile(ISender sender, UpdateJobSeekerProfileCommand command)
    {
        var result = await sender.Send(command);
        return Results.Ok(result);
    }

    public async Task<IResult> GetJobSeekerDetailById([FromRoute] Guid userId, [FromServices] ISender sender)
    {
        var query = new GetJobSeekerDetailQuery { Id = userId };
        var result = await sender.Send(query);
        return Results.Ok(result);
    }

    public async Task<IResult> UpdateJobSeekerLogo([FromServices] ISender sender, UpdateJobSeekerLogoCommand command)
    {
        JobSeeker entityResult = await sender.Send(command);
        return Results.Ok(entityResult);
    }
}