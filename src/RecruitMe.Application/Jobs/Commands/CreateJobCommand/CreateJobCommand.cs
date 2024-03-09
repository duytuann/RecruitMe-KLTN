using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Jobs.Commands.CreateJobCommand;

public record CreateJobCommand : IRequest<Guid>
{
    public string? Title { get; init; }
    public string? Description { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    // Thêm các trường khác mà bạn cần cho Job
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
        var job = new Job
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            StateCode = Domain.Enums.StateCode.Inactive
        };

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync(cancellationToken);

        return job.Id;
    }
}
