using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;

namespace RecruitMe.Application.Companies.Queries.GetDetailCompanyById;

public record GetCompanyDetailQuery : IRequest<CompanyDetailVm>
{
    public Guid Id { get; set; } // this is userId, not companyId
};

public class GetCompanyDetailQueryHandler : IRequestHandler<GetCompanyDetailQuery, CompanyDetailVm>
{
    private readonly IApplicationDbContext _context;

    public GetCompanyDetailQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CompanyDetailVm> Handle(GetCompanyDetailQuery request, CancellationToken cancellationToken)
    {
        if (request.Id == null)
        {
            throw new ArgumentNullException("CompanyId is required!");
        }

        var result = await _context.Companies.Join(_context.Users, company => company.UserId, user => user.Id, (company, user) => new { company, user })
            .Where(item => item.company.UserId == request.Id)
            .Select(item => new CompanyDetailVm()
            {
                UserId = item.company.UserId,
                Email = item.user.Email,
                Address = item.company.Address,
                CompanySize = item.company.CompanySize,
                Country = item.company.Country,
                CompanyOverview = item.company.CompanyOverview,
                LogoImage = item.company.LogoImage,
                CoverPhoto = item.company.CoverPhoto,
                PhoneNumber = item.company.PhoneNumber,
                Website = item.company.Website,
                ProfileUrl = item.company.ProfileUrl,
                About = item.company.About,
                Title = item.company.Title
            })
            .FirstOrDefaultAsync();

        return result;
    }
}