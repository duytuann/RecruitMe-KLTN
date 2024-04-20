using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Application.Companies.Queries.ViewModel;

namespace RecruitMe.Application.Companies.Queries.GetDetailCompanyByCompanyId;

public record GetDetailCompanyByCompanyIdQuery : IRequest<CompanyDetailVm>
{
    public Guid CompanyId { get; set; }
};

public class GetDetailCompanyByCompanyIdHandler : IRequestHandler<GetDetailCompanyByCompanyIdQuery, CompanyDetailVm>
{
    private readonly IApplicationDbContext _context;

    public GetDetailCompanyByCompanyIdHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CompanyDetailVm> Handle(GetDetailCompanyByCompanyIdQuery request, CancellationToken cancellationToken)
    {
        if (request.CompanyId == null)
        {
            throw new ArgumentNullException("CompanyId is required!");
        }

        var result = await _context.Companies.Join(_context.Users, company => company.UserId, user => user.Id, (company, user) => new { company, user })
            .Where(item => item.company.Id == request.CompanyId)
            .Select(item => new CompanyDetailVm()
            {
                Id = item.company.Id,
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

        var openJobs = await _context.Jobs.Where(item => item.CompanyId == request.CompanyId && item.EndDate >= DateTimeOffset.Now).ToListAsync();

        result.OpenJobs = openJobs;

        return result;
    }
}