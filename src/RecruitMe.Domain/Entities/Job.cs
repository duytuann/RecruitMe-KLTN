using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitMe.Domain.Entities;

public class Job : BaseAuditableEntity
{
    public Guid CompanyId { get; set; }

    public Guid JobSeekerId { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset StartDate { get; set; }

    // public Category Category { get; set; }
    
    public int? JobType { get; set; }

    public DateTimeOffset EndDate { get; set;}

    public string? JobApplyEmail { get; set; }

    public string? PhoneNumber { get; set; }

    public int? SalaryType { get; set; }

    public string? MinSalary { get; set; }

    public string? MaxSalary { get; set; }

    public int? Gender { get; set; }

    public string? Tag { get; set; }

    // qualification

    public int? Experience { get; set; }

    [NotMapped]
    public List<Skill> Skills { get; set; }
}
