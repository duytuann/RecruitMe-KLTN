using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class Job : BaseAuditableEntity
{
    public string? Salary { get; set; }

    public string? Address { get; set; }

    public JobType? JobType { get; set; }

    public int? NumberToHire { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset EndDate { get; set; }
}
