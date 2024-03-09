using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Jobs.Commands.SubmitJobCommand;

public record SubmitJobCommand : IRequest<Guid>
{
    public Job Job { get; init; }
}

public class SubmitJobCommandHandler : IRequestHandler<SubmitJobCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public SubmitJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(SubmitJobCommand request, CancellationToken cancellationToken)
    {
        var job = request.Job;
        job.StateCode = Domain.Enums.StateCode.Active;

        _context.Jobs.Update(job);

        await _context.SaveChangesAsync(cancellationToken);

        return job.Id;
    }
}