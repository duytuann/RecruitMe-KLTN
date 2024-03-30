using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Application.Companies.Queries.GetDetailCompanyById;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Jobs.Queries.GetListJobByUserId;

public record GetListJobQuery : IRequest<List<Job>>
{
    public Guid? UserId { get; set; }

    public int? StateCode { get; set; }
};

public class GetListJobQueryHandler : IRequestHandler<GetListJobQuery, List<Job>>
{
    private readonly IApplicationDbContext _context;

    public GetListJobQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Job>> Handle(GetListJobQuery request, CancellationToken cancellationToken)
    {
        if (request.UserId == null)
        {
            throw new ArgumentNullException("UserId is required!");
        }

        if (request.StateCode == null) 
        {
            throw new ArgumentNullException("Status is required!");
        }

        var companyId = await _context.Companies
            .Where(item => item.UserId ==  request.UserId)
            .Select(item => item.Id)
            .FirstOrDefaultAsync();

        var result = await _context.Jobs
            .AsNoTracking()
            .Where(item => item.CompanyId == companyId && item.StateCode == request.StateCode)
            .ToListAsync();

        return result;
    }
}