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

    public async Task<CompanyDetailVm> Handle(GetCompanyDetailQuery request, CancellationToken cancellationToken)
    {
        if (request.Id == null)
        {
            throw new ArgumentNullException("CompanyId is required!");
        }

        var result = await _context.Companies.Where(item => item.UserId == request.Id).Select(item => new CompanyDetailVm()
        {
            UserId = item.UserId,
            Address = item.Address,
            CompanySize = item.CompanySize,
            Country = item.Country,
            CompanyOverview = item.CompanyOverview,
            LogoImage = item.LogoImage,
            CoverPhoto = item.CoverPhoto,
            PhoneNumber = item.PhoneNumber,
            Website = item.Website,
            ProfileUrl = item.ProfileUrl,
            About = item.About
        }).FirstOrDefaultAsync();

        return result;
    }
}