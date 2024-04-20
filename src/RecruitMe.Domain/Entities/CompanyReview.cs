using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class CompanyReview : BaseAuditableEntity
{
    public Guid CompanyId { get; set; }

    public string? CompanyLookupName { get; set; }

    public Guid JobSeekerId { get; set; }

    public string? JobSeekerLookupName { get; set; }

    public string? Review {  get; set; }

    public int? Rating { get; set; }
}