using MediatR;
using RecruitMe.Application.JobSeekers.Commands.RegisterJobSeeker;
using RecruitMe.WebApi.Infrastructure;

namespace RecruitMe.WebApi.Endpoints;

public class JobSeekers : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup("/jobseekers")
            .MapPost("/register", RegisterJobSeeker);
    }

    public async Task<Guid> RegisterJobSeeker(ISender sender, RegisterJobSeekerCommand command)
    {
        return await sender.Send(command);
    }
}