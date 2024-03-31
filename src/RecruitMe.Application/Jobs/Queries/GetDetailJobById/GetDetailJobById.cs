using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        return result;
    }
}