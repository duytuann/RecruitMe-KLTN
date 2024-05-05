using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.JobApplicants.Commands.CreateJobApplicantCommand;
public record ApproveJobApplicantCommand : IRequest<bool>
{
    public Guid JobApplicantId { get; set; }
}

public class ApproveJobApplicantCommandHandler : IRequestHandler<ApproveJobApplicantCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public ApproveJobApplicantCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(ApproveJobApplicantCommand request, CancellationToken cancellationToken)
    {
        var jobApplicant = await _context.JobApplicants.FindAsync(request.JobApplicantId);
        if (jobApplicant == null) return false;

        jobApplicant.JobApplicantStatus = 2; // Assuming 2 is the status code for approved
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}