using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.Users.Command.Login;
using RecruitMe.Domain.Entities;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/users")
            .MapPost("/login", Login)
            .Produces<User>(StatusCodes.Status200OK)
            .WithTags("Users");
    }

    public async Task<IResult> Login(ISender sender, LoginCommand command)
    {
        var token = await sender.Send(command);
        return Results.Ok(token);
    }
}