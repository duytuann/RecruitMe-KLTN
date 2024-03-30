using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Jobs.Commands.DraftJobCommand;

public record DraftJobCommand : IRequest<Job>
{
    public Job Job { get; init; }
}

public class DraftJobCommandHandler : IRequestHandler<DraftJobCommand, Job>
{
    private readonly IApplicationDbContext _context;

    public DraftJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Job> Handle(DraftJobCommand request, CancellationToken cancellationToken)
    {
        var job = request.Job;
        job.StateCode = (int)Domain.Enums.EStateCode.Draft;

        _context.Jobs.Update(job);

        await _context.SaveChangesAsync(cancellationToken);

        return job;
    }
}
