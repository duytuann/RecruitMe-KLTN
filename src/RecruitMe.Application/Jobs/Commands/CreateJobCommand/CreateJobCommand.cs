using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.Jobs.Commands.CreateJobCommand;

public record CreateJobCommand : IRequest<Guid>
{
    public Guid UserId { get; init; }

    public DateTimeOffset StartDate { get; init; }

    public DateTimeOffset EndDate { get; init; }

    public string? Title { get; init; }

    public int? Experience { get; init; }
    
    public string? Description { get; init; }

    public int? JobType { get; init; }

    public string? PhoneNumber { get; init; }

    public int? Gender { get; init; }

    public int? SalaryType { get; init; }

    public string? MinSalary { get; init; }

    public string? MaxSalary { get; init; }

    public string? Tag { get; init; }

    public List<Skill> skills { get; init; }
}

public class CreateJobCommandHandler : IRequestHandler<CreateJobCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateJobCommand request, CancellationToken cancellationToken)
    {
        var companyId = await _context.Companies.Where(c => c.UserId == request.UserId)
            .Select(c => c.Id)
            .FirstOrDefaultAsync(cancellationToken);

        var job = new Job
        {
            Id = Guid.NewGuid(),
            CompanyId = companyId,
            //JobSeekerId = ...,
            Title = request.Title,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            JobType = request.JobType,
            PhoneNumber = request.PhoneNumber,
            Gender = request.Gender,
            SalaryType = request.SalaryType,
            MinSalary = request.MinSalary,
            MaxSalary = request.MaxSalary,
            Tag = request.Tag,
            Experience = request.Experience,
            StateCode = (int)EStateCode.Active
        };

        _context.Jobs.Add(job);

        foreach (var skill in request.skills)
        {
            var jobSkill = new JobSkill()
            {
                Id = new Guid(),
                JobId = job.Id,
                SkillId = skill.Id,
            };

            _context.JobSkills.Add(jobSkill);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return job.Id;
    }
}
