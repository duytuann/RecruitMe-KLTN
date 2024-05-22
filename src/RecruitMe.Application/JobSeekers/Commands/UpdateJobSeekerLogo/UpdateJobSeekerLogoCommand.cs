using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.JobSeekers.Commands.UpdateJobSeekerLogo;

public record UpdateJobSeekerLogoCommand : IRequest<JobSeeker>
{
    public Guid Id { get; init; }
    public string? LogoImage { get; init; }
}

public class UpdateJobSeekerLogoCommandHandler : IRequestHandler<UpdateJobSeekerLogoCommand, JobSeeker>
{
    private readonly IApplicationDbContext _context;

    public UpdateJobSeekerLogoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobSeeker> Handle(UpdateJobSeekerLogoCommand request, CancellationToken cancellationToken)
    {
        var jobseeker = await _context.JobSeekers
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (jobseeker == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        jobseeker.LogoImage = request.LogoImage;

        await _context.SaveChangesAsync(cancellationToken);

        return jobseeker;
    }
}