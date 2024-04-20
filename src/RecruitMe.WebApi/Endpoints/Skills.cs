using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    }

    public async Task<IResult> GetAllSkills([FromServices] ISender sender)
    {
        var query = new GetAllSkillsQuery();
        var skills = await sender.Send(query);
        return Results.Ok(skills);
    }
}