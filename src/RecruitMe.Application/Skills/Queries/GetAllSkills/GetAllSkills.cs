using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruitMe.Application.Skills.Queries.GetAllSkills;

public record GetAllSkillsQuery : IRequest<List<Skill>>
{
};

public class GetAllSkillsQueryHandler : IRequestHandler<GetAllSkillsQuery, List<Skill>>
{
    private readonly IApplicationDbContext _context;

    public GetAllSkillsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Skill>> Handle(GetAllSkillsQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Skills.ToListAsync(cancellationToken);

        return result;
    }
}