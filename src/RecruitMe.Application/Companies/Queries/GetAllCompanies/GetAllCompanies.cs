using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Companies.Queries.GetDetailCompanyById;

public record GetAllCompaniesQuery : IRequest<List<Company>>
{
};

public class GetAllCompaniesQueryHandler : IRequestHandler<GetAllCompaniesQuery, List<Company>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCompaniesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Company>> Handle(GetAllCompaniesQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Companies.Where(company => company.Id != null).ToListAsync(cancellationToken);

        return result;
    }
}