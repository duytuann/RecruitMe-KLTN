using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class CompanySkill : BaseAuditableEntity
{
    public Guid? CompanyId { get; set; }

    public string? CompanyLookupName { get; set; }

    public Guid? SkillId { get; set; }

    public string? SkillLookupName { get; set; }
}
