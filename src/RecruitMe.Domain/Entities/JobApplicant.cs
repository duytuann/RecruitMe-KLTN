using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class JobApplicant : BaseAuditableEntity
{
    public Guid? JobId { get; set; }

    public Guid? CompanyId { get; set; }

    public Guid? JobSeekerId { get; set; }

    public string? CoverLetter { get; set; }

    public string? CVLink { get; set; }
    
    public string? Email { get; set; }

    public string? Name { get; set; }
}
