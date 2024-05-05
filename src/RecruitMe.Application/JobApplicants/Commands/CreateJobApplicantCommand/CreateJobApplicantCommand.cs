using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.JobApplicants.Commands.CreateJobApplicantCommand;
public record CreateJobApplicantCommand : IRequest<Guid>
{
    public Guid? JobId { get; set; }

    public Guid? JobSeekerId { get; set; }

    public string? CoverLetter { get; set; }

    public string? CVLink { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }
}

public class CreateJobApplicantCommandHandler : IRequestHandler<CreateJobApplicantCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateJobApplicantCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateJobApplicantCommand request, CancellationToken cancellationToken)
    {
        var companyId = await _context.Jobs
            .Where(item => item.Id == request.JobId)
            .Select(item => item.CompanyId)
            .FirstOrDefaultAsync();

        var jobApplicant = new JobApplicant
        {
            Id = Guid.NewGuid(),
            JobId = request.JobId,
            JobSeekerId = request.JobSeekerId,
            CoverLetter = request.CoverLetter,
            CVLink = request.CVLink,
            CompanyId = companyId,
            Name = request.Name,
            Email = request.Email,
            JobApplicantStatus = 1
        };


        _context.JobApplicants.Add(jobApplicant);

        await _context.SaveChangesAsync(cancellationToken);

        return jobApplicant.Id;
    }
}
