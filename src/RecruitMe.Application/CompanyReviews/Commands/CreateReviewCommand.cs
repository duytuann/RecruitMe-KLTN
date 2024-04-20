using MediatR;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruitMe.Application.CompanyReviews.Commands;

public record CreateReviewCommand : IRequest<Guid>
{
    public Guid JobSeekerId { get; init; }

    public Guid CompanyId { get; init; }

    public string? Review {  get; init; }

    public int? Rating { get; init; }
}

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateReviewCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new CompanyReview
        {
            Id = new Guid(),
            Review = request.Review,
            Rating = request.Rating,
            CompanyId = request.CompanyId,
            JobSeekerId = request.JobSeekerId
        };

        _context.CompanyReviews.Add(review);

        _ = await _context.SaveChangesAsync(cancellationToken);

        return review.Id;
    }
}
