using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class JobSkill : BaseAuditableEntity
{
    public Guid? JobId { get; set; }

    public string? JobLookupName { get; set; }

    public Guid? SkillId { get; set; }

    public string? SkillLookupName { get; set; }
}
