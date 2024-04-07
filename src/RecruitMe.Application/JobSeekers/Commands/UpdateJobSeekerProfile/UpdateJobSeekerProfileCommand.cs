using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using RecruitMe.Application.Common.Interfaces;

namespace RecruitMe.Application.JobSeekers.Commands.UpdateJobSeekerProfile;

public record UpdateJobSeekerProfileCommand : IRequest<bool>
{
    public Guid UserId { get; init; }

    public int UpdateType { get; init; } // 1: information 2: about me 3: work experiences 4: skills

    public string? Title { get; init; }

    public string? RoleTitle { get; init; }

    public string? Email { get; init; }

    public string? PhoneNumber { get; init; }

    public DateTimeOffset? DateOfBirth { get; init; }

    public int? Gender { get; init; }

    public string? Address { get; init; }

    public string? PersonalLink { get; init; }

    public string? AboutMe { get; init; }

    public string? WorkExperiences { get; init; }
}

public class UpdateJobSeekerProfileCommandHandler : IRequestHandler<UpdateJobSeekerProfileCommand, bool>
{
    public readonly IApplicationDbContext _context;

    public UpdateJobSeekerProfileCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateJobSeekerProfileCommand request, CancellationToken cancellationToken)
    {
        var jobseeker = await _context.JobSeekers.Where(item => item.UserId == request.UserId).FirstOrDefaultAsync();

        if (jobseeker == null)
            return false;

        if (request.UpdateType == 1) // information
        {
            jobseeker.Title = request.Title;
            jobseeker.RoleTitle = request.RoleTitle;
            jobseeker.Email = request.Email;
            jobseeker.PhoneNumber = request.PhoneNumber;
            jobseeker.DateOfBirth = request.DateOfBirth;
            jobseeker.Gender = request.Gender;
            jobseeker.Address = request.Address;
            jobseeker.PersonalLink = request.PersonalLink;
        }

        if (request.UpdateType == 2) // about me
        {
            jobseeker.AboutMe = request.AboutMe;
        }

        if (request.UpdateType == 3) // work experiences
        {
            jobseeker.WorkExperiences = request.WorkExperiences;
        }

        var result = await _context.SaveChangesAsync(cancellationToken);

        return result > 0;
    }
}