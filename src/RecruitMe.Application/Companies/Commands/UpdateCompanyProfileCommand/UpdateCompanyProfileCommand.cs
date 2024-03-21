using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.Companies.Commands.UpdateCompanyProfileCommand;

public record UpdateCompanyProfileCommand : IRequest<Company>
{
    public string UserName { get; init; }
    public string Email { get; init; }
    public string Password { get; init; }
    public UserType? UserType { get; init; }
    public string? Title { get; init; }
    public string? Address { get; init; }
    public CompanyType Type { get; init; }
    public string? CompanySize { get; init; }
    public string? Country { get; init; }
    public string? WorkingDays { get; init; }
}

public class RegisterCompanyCommandHandler : IRequestHandler<RegisterCompanyCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public RegisterCompanyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(RegisterCompanyCommand request, CancellationToken cancellationToken)
    {
        // Tạo một User mới với thông tin từ request
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
            UserType = UserType.Employer
        };

        await _context.Users.AddAsync(user, cancellationToken);

        var company = new Company
        {
            UserId = user.Id,
            Title = request.Title, // company name
            Address = request.Address,
            CompanySize = request.CompanySize,
            Country = request.Country,
            // Other fields
        };

        await _context.Companies.AddAsync(company, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return company.Id;
    }
}