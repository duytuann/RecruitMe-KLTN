using MediatR;
using Microsoft.AspNetCore.Mvc;
using RecruitMe.Application.Users.Command.Login;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/api/users")
            .MapPost("/login", Login);
    }

    public async Task<string> Login(ISender sender, [FromBody] LoginCommand command)
    {
        return await sender.Send(command);
    }
}