using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.Companies.Commands.UpdateCompanyLogoCommand;

public record UpdateCompanyLogoCommand : IRequest<Company>
{
    public Guid Id { get; init; }
    public string? LogoImage { get; init; }
}

public class UpdateCompanyLogoCommandHandler : IRequestHandler<UpdateCompanyLogoCommand, Company>
{
    private readonly IApplicationDbContext _context;

    public UpdateCompanyLogoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Company> Handle(UpdateCompanyLogoCommand request, CancellationToken cancellationToken)
    {
        var company = await _context.Companies
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (company == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        company.LogoImage = request.LogoImage;

        await _context.SaveChangesAsync(cancellationToken);

        return company;
    }
}