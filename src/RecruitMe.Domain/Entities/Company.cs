using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class Company : BaseAuditableEntity
{
    public Guid UserId { get; set; }

    public Guid UserLookupName { get; set; }

    public CompanyType Type { get; set; }

    public string? Address { get; set; }

    public int? CompanySize { get; set; }

    public string? Country { get; set; }

    public string? WorkingDays { get; set; }

    public string? CompanyOverview { get; set; }
}