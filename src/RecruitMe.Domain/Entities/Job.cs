using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class Job : BaseAuditableEntity
{
    public string? Description { get; set; }

    public DateTimeOffset StartDate { get; set; }

    // public Category Category { get; set; }
    
    public EJobType JobType { get; set; }

    public DateTimeOffset EndDate { get; set;}

    public string? JobApplyEmail { get; set; }

    public string? PhoneNumber { get; set; }

    public ESalaryType SalaryType { get; set; }

    public string? MinSalary { get; set; }

    public string? MaxSalary { get; set; }

    public EJobGender Gender { get; set; }

    public string? Tag { get; set; }

    // qualification

    public EExperience Experience { get; set; }
}
