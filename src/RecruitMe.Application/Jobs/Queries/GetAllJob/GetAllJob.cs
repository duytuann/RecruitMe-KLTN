using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public record GetAllJobQuery : IRequest<List<Job>>
{
};

public class GetAllJobQueryHandler : IRequestHandler<GetAllJobQuery, List<Job>>
{
    private readonly IApplicationDbContext _context;

    public GetAllJobQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Job>> Handle(GetAllJobQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Jobs
            .Where(item => item.EndDate >= DateTimeOffset.Now)
            .ToListAsync(cancellationToken);

        foreach (var job in result)
        {
            var skills = _context.JobSkills.Where(item => item.JobId == job.Id).ToListAsync(cancellationToken);
            
        }

        return result;
    }
}