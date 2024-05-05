using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;

public class SearchResultDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public int? Type { get; set; } // 1: Job 2: Company
}

namespace RecruitMe.Application.Jobs.Queries.SearchJobsAndCompaniesQuery
{
    public class SearchJobsAndCompaniesQuery : IRequest<List<SearchResultDto>>
    {
        public string? SearchTerm { get; set; }
    }
    public class SearchJobsAndCompaniesQueryHandler : IRequestHandler<SearchJobsAndCompaniesQuery, List<SearchResultDto>>
    {
        private readonly IApplicationDbContext _context;

        public SearchJobsAndCompaniesQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<SearchResultDto>> Handle(SearchJobsAndCompaniesQuery request, CancellationToken cancellationToken)
        {
            var jobs = await _context.Jobs
                .Where(job => job.Title.Contains(request.SearchTerm))
                .Select(job => new SearchResultDto
                {
                    Id = job.Id,
                    Title = job.Title,
                    Type = 1
                })
                .ToListAsync(cancellationToken);

            var companies = await _context.Companies
                .Where(company => company.Title.Contains(request.SearchTerm))
                .Select(company => new SearchResultDto
                {
                    Id = company.Id,
                    Title = company.Title,
                    Type = 2
                })
                .ToListAsync(cancellationToken);

            return jobs.Concat(companies).ToList();
        }
    }
}
