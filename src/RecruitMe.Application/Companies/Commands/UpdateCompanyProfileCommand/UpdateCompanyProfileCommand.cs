using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.Companies.Commands.UpdateCompanyProfileCommand;

public record UpdateCompanyProfileCommand : IRequest<Company>
{
    public Guid Id { get; init; }
    public string? Title { get; init; }
    public string? PhoneNumber { get; init; }
    public string? Website { get; init; }
    public string? Address { get; init; }
    public string? CompanySize { get; init; }
    public string? About { get; init; }

    public string? LogoImage { get; init; }
}

public class UpdateCompanyProfileCommandHandler : IRequestHandler<UpdateCompanyProfileCommand, Company>
{
    private readonly IApplicationDbContext _context;

    public UpdateCompanyProfileCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Company> Handle(UpdateCompanyProfileCommand request, CancellationToken cancellationToken)
    {
        var company = await _context.Companies
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (company == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        company.Title = request.Title;
        company.PhoneNumber = request.PhoneNumber;
        company.Website = request.Website;
        company.Address = request.Address;
        company.CompanySize = request.CompanySize;
        company.About = request.About;
        company.LogoImage = request.LogoImage;

        await _context.SaveChangesAsync(cancellationToken);

        return company;
    }
}