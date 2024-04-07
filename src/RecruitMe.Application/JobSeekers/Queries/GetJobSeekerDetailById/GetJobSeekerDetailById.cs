using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.JobSeekers.Queries.GetJobSeekerDetailById;

public record GetJobSeekerDetailQuery : IRequest<JobSeeker>
{
    public Guid Id { get; set; } // this is userId, not jobseekerId
};

public class GetJobSeekerDetailQueryHandler : IRequestHandler<GetJobSeekerDetailQuery, JobSeeker>
{
    private readonly IApplicationDbContext _context;

    public GetJobSeekerDetailQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobSeeker> Handle(GetJobSeekerDetailQuery request, CancellationToken cancellationToken)
    {
        if (request.Id == null)
        {
            throw new ArgumentNullException("CompanyId is required!");
        }

        var user = await _context.Users
            .Where(item => item.Id == request.Id)
            .FirstOrDefaultAsync();

        var result = await _context.JobSeekers
            .Where(item => item.UserId == request.Id)
            .FirstOrDefaultAsync();

        result.Email = user.Email;

        return result;
    }
}