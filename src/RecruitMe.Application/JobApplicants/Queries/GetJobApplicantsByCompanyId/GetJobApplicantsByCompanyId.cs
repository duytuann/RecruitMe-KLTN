using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.JobApplicants.Queries.GetJobApplicantsByCompanyId;

public record GetJobApplicantsByCompanyIdQuery : IRequest<List<JobApplicant>>
{
    public Guid CompanyId { get; set; }
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
        var result = await _context.JobApplicants.Where(item => item.CompanyId == request.CompanyId).ToListAsync(cancellationToken);

        return result;
    }
}