using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Companies.Commands.UpdateCompanyProfileCommand;

public record UpdateCompanySkillsCommand : IRequest<bool>
{
    public Guid Id { get; init; }
    public List<Skill> Skills { get; init; }
}

public class UpdateCompanySkillsCommandHandler : IRequestHandler<UpdateCompanySkillsCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public UpdateCompanySkillsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateCompanySkillsCommand request, CancellationToken cancellationToken)
    {
        var company = await _context.Companies
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (company == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        var companySkills = await _context.CompanySkills
            .Where(item => item.CompanyId == request.Id).ToListAsync();

        foreach(var skill in companySkills)
        {
            _context.CompanySkills.Remove(skill);
        }

        foreach(var skill in request.Skills)
        {
            var companySkill = new CompanySkill()
            {
                Id = new Guid(),
                CompanyId = request.Id,
                SkillId = skill.Id
            };

            _context.CompanySkills.Add(companySkill);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}