using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.Jobs.Commands.AutoInactiveExpriedJobCommand;
using RecruitMe.Application.Jobs.Commands.CreateJobCommand;
using RecruitMe.Application.Jobs.Commands.DraftJobCommand;
using RecruitMe.Application.Jobs.Commands.SubmitJobCommand;
using RecruitMe.Application.Jobs.Commands.UpdateJobCommand;
using RecruitMe.Application.Jobs.Queries.GetDetailJobById;
using RecruitMe.Application.Jobs.Queries.GetListJobByUserId;
using RecruitMe.Application.Jobs.Queries.SearchJobsAndCompaniesQuery;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;
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

        app.MapGroup("/api/jobs")
            .MapPost("/getlistjob/{userId:guid}/{stateCode:int}", GetListJob)
            .Produces<List<Job>>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapGet("/getdetailjob/{jobId:guid}", GetDetailJobById)
            .Produces<Job>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapGet("/getalljob", GetAllJob)
            .Produces<Job>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapPost("/updatejob", UpdateJob)
            .Produces<Job>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapPost("/autoinactiveexpriedjob", AutoInactiveExpriedJob)
            .Produces<bool>(StatusCodes.Status200OK)
            .WithTags("Jobs");

        app.MapGroup("/api/jobs")
            .MapGet("/search/{searchTerm:string}", SearchJobsAndCompanies)
            .Produces<List<SearchResultDto>>(StatusCodes.Status200OK)
            .WithTags("Jobs");
    }

    private async Task<IResult> SearchJobsAndCompanies([FromQuery] string searchTerm, [FromServices] ISender sender)
    {
        var query = new SearchJobsAndCompaniesQuery { SearchTerm = searchTerm };
        var result = await sender.Send(query);
        return Results.Ok(result);
    }

    public async Task<IResult> GetDetailJobById([FromRoute] Guid jobId, ISender sender)
    {
        var query = new GetJobDetailQuery() { JobId = jobId };
        var jobs = await sender.Send(query);
        return Results.Ok(jobs);
    }

    public async Task<IResult> GetAllJob(ISender sender)
    {
        var query = new GetAllJobQuery();
        var jobs = await sender.Send(query);
        return Results.Ok(jobs);
    }

    public async Task<IResult> CreateJob(ISender sender, CreateJobCommand command)
    {
        var jobId = await sender.Send(command);
        return Results.Created($"/api/jobs/{jobId}", jobId);
    }

    public async Task<IResult> UpdateJob(ISender sender, UpdateJobCommand command)
    {
        var job = await sender.Send(command);
        return Results.Ok(job);
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

    public async Task<IResult> GetListJob([FromRoute] Guid userId, [FromRoute] int stateCode, ISender sender)
    {
        var query = new GetListJobQuery() { UserId = userId, StateCode = stateCode };
        var jobs = await sender.Send(query);
        return Results.Ok(jobs);
    }

    public async Task<IResult> AutoInactiveExpriedJob(ISender sender, AutoInactiveExpriedJobCommand command)
    {
        var result = await sender.Send(command);
        return Results.Ok(result);
    }   
}
