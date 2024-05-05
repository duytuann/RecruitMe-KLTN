using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.JobApplicants.Commands.CreateJobApplicantCommand;
public record RejectJobApplicantCommand : IRequest<bool>
{
    public Guid JobApplicantId { get; set; }
}

public class RejectJobApplicantCommandHandler : IRequestHandler<RejectJobApplicantCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RejectJobApplicantCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RejectJobApplicantCommand request, CancellationToken cancellationToken)
    {
        var jobApplicant = await _context.JobApplicants.FindAsync(request.JobApplicantId);
        if (jobApplicant == null) return false;

        jobApplicant.JobApplicantStatus = 3; // Assuming 3 is the status code for rejected
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}