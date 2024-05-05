using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.JobApplicants.Queries.GetJobApplicantsByCompanyId;

public record GetJobApplicantsByCompanyIdQuery : IRequest<List<JobApplicant>>
{
    public Guid CompanyId { get; init; }

    public int Status { get; init; } // 1,2,3
};

public class GetJobApplicantsByCompanyIdQueryHandler : IRequestHandler<GetJobApplicantsByCompanyIdQuery, List<JobApplicant>>
{
    private readonly IApplicationDbContext _context;

    public GetJobApplicantsByCompanyIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<JobApplicant>> Handle(GetJobApplicantsByCompanyIdQuery request, CancellationToken cancellationToken)
    {
        

        var result = await _context.JobApplicants
            .Where(item => item.CompanyId == request.CompanyId && item.JobApplicantStatus == request.Status)
            .ToListAsync(cancellationToken);

        return result;
    }
}