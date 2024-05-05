using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RecruitMe.Application.Jobs.Queries.GetDetailJobById;

public record GetJobDetailQuery : IRequest<Job>
{
    public Guid? JobId { get; set; }
};

public class GetJobDetailQueryHandler : IRequestHandler<GetJobDetailQuery, Job>
{
    private readonly IApplicationDbContext _context;

    public GetJobDetailQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Job> Handle(GetJobDetailQuery request, CancellationToken cancellationToken)
    {
        if (request.JobId == null)
        {
            throw new ArgumentNullException("JobId is required!");
        }

        var result = await _context.Jobs
            .Where(item => item.Id == request.JobId)
            .FirstOrDefaultAsync();

        var skills = await _context.JobSkills
            .Join(_context.Skills, ck => ck.SkillId, s => s.Id, (ck, s) => new { ck, s })
            .Where(item => item.ck.JobId == result.Id)
            .Select(item => new Skill()
            {
                Title = item.s.Title,
                Id = item.s.Id
            })
            .ToListAsync();

        result.Skills = skills;


        return result;
    }
}