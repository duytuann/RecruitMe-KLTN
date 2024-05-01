using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Application.Companies.Queries.ViewModel;
using RecruitMe.Domain.Entities;

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

        var company = await _context.Companies.Where(item => item.UserId == request.Id).FirstOrDefaultAsync();

        if (company == null)
        {
            throw new ArgumentNullException("Can not find company!");
        }

        var skills = await _context.CompanySkills
            .Join(_context.Skills, ck => ck.SkillId, s => s.Id, (ck, s) => new {ck, s})
            .Where(item => item.ck.CompanyId == company.Id)
            .Select(item => new Skill()
                    {
                        Title = item.s.Title,
                        Id = item.s.Id
                    })
            .ToListAsync();

        var result = await _context.Companies.Join(_context.Users, company => company.UserId, user => user.Id, (company, user) => new { company, user })
            .Where(item => item.company.UserId == request.Id)
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
                Title = item.company.Title,
                Skills = skills
            })
            .FirstOrDefaultAsync();

        return result;
    }
}