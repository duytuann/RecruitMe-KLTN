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

public record GetReviewsByCompanyIdQuery : IRequest<List<CompanyReview>>
{
    public Guid? CompanyId { get; set; }
};

public class GetReviewsByCompanyIdQueryHandler : IRequestHandler<GetReviewsByCompanyIdQuery, List<CompanyReview>>
{
    private readonly IApplicationDbContext _context;

    public GetReviewsByCompanyIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CompanyReview>> Handle(GetReviewsByCompanyIdQuery request, CancellationToken cancellationToken)
    {
        if (request.CompanyId == null)
        {
            throw new ArgumentNullException("CompanyId is required!");
        }

        var result = await _context.CompanyReviews.Where(item => item.CompanyId == request.CompanyId).ToListAsync();

        return result;
    }
}