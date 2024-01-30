using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class CompanyReview : BaseAuditableEntity
{
    public Guid CompanyId { get; set; }

    public string? CompanyLookupName { get; set; }

    public Guid JobSeekerId { get; set; }

    public string? JobSeekerLookupName { get; set; }
}