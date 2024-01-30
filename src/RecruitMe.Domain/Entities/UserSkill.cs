using RecruitMe.Domain.Common;

namespace RecruitMe.Domain.Entities;

public class UserSkill : BaseAuditableEntity
{
    public string? Title { get; set; }

    public Guid? UserId { get; set; }

    public string? UserLookupName { get; set; }

    public Guid? SkillId { get; set; }

    public string? SkillLookupName { get; set; }
}