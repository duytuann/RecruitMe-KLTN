using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruitMe.Application.Jobs.Commands.AutoInactiveExpriedJobCommand;

public record AutoInactiveExpriedJobCommand : IRequest<bool>
{
    public Guid UserId { get; init; }
}

public class AutoInactiveExpriedJobCommandHandler : IRequestHandler<AutoInactiveExpriedJobCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public AutoInactiveExpriedJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(AutoInactiveExpriedJobCommand request, CancellationToken cancellationToken)
    {
        var companyId = await _context.Companies.Where(c => c.UserId == request.UserId)
            .Select(c => c.Id)
            .FirstOrDefaultAsync();

        var jobs = await _context.Jobs.Where(item => item.CompanyId == companyId).ToListAsync();

        var currentDate = DateTimeOffset.Now.Date;
        var day = currentDate.Day;
        var month = currentDate.Month;
        var year = currentDate.Year;

        foreach (var job in jobs)
        {
            var jobEndDate = job.EndDate;

            if (jobEndDate.Year <= year && jobEndDate.Month <= month && jobEndDate.Day <= day)
            {
                job.StateCode = (int)EStateCode.Inactive;
            }
            _context.SaveChangesAsync(cancellationToken);

        }
        return true;
    }
}
