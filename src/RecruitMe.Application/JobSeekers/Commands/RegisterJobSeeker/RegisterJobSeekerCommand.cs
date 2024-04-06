using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.JobSeekers.Commands.RegisterJobSeeker;

public record RegisterJobSeekerCommand : IRequest<Guid>
{
    public string? Email { get; init; }
    public string? Password { get; init; }
    public string? Title { get; init; }
}

public class RegisterJobSeekerCommandHandler : IRequestHandler<RegisterJobSeekerCommand, Guid>
{
    public readonly IApplicationDbContext _context;

    public RegisterJobSeekerCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(RegisterJobSeekerCommand request, CancellationToken cancellationToken)
    {
        // unit of work pattern
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
            UserType = UserType.Jobseeker,
            Title = request.Title
        };

        _context.Users.Add(user);

        var jobSeeker = new JobSeeker
        {
            Id = Guid.NewGuid(),
            Title = request.Title
        };

        _context.JobSeekers.Add(jobSeeker);

        await _context.SaveChangesAsync(cancellationToken);

        return jobSeeker.Id;
    }
}

