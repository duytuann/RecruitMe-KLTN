using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Companies.Commands.UpdateJobSkillsCommand;

public record UpdateJobSkillsCommand : IRequest<bool>
{
    public Guid Id { get; init; } // job id
    public List<Skill> Skills { get; init; }
}

public class UpdateCompanySkillsCommandHandler : IRequestHandler<UpdateJobSkillsCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public UpdateCompanySkillsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateJobSkillsCommand request, CancellationToken cancellationToken)
    {
        var job = await _context.Jobs
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (job == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        var jobSkills = await _context.JobSkills
            .Where(item => item.JobId == request.Id).ToListAsync();

        foreach(var skill in jobSkills)
        {
            _context.JobSkills.Remove(skill);
        }

        foreach(var skill in request.Skills)
        {
            var jobSkill = new JobSkill()
            {
                Id = new Guid(),
                JobId = request.Id,
                SkillId = skill.Id
            };

            _context.JobSkills.Add(jobSkill);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}