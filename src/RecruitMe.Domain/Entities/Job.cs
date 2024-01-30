using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class Job : BaseAuditableEntity
{
    public string? Salary { get; set; }

    public string? Address { get; set; }

    public JobType? JobType { get; set; }

}
