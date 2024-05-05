using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.Companies.Commands.UpdateCompanyProfileCommand;
using RecruitMe.Application.Companies.Commands.UpdateJobSkillsCommand;
using RecruitMe.Application.Skills.Queries.GetAllSkills;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class Skills : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/skills")
            .MapGet("/getallskills", GetAllSkills)
            .Produces<List<Skill>>(StatusCodes.Status200OK)
            .WithTags("Skills");

        app.MapGroup("/api/skills")
            .MapPost("/updatecompanyskills", UpdateCompanySkills)
            .Produces<List<Skill>>(StatusCodes.Status200OK)
            .WithTags("Skills");

        app.MapGroup("/api/skills")
            .MapPost("/updatejobskills", UpdateJobSkills)
            .Produces<List<Skill>>(StatusCodes.Status200OK)
            .WithTags("Skills");
    }

    public async Task<IResult> GetAllSkills([FromServices] ISender sender)
    {
        var query = new GetAllSkillsQuery();
        var skills = await sender.Send(query);
        return Results.Ok(skills);
    }

    public async Task<IResult> UpdateCompanySkills([FromServices] ISender sender, UpdateCompanySkillsCommand command)
    {
        bool _ = await sender.Send(command);
        return Results.Ok();
    }

    public async Task<IResult> UpdateJobSkills([FromServices] ISender sender, UpdateJobSkillsCommand command)
    {
        bool _ = await sender.Send(command);
        return Results.Ok();
    }
}