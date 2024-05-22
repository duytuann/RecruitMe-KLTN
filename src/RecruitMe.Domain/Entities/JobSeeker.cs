using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class JobSeeker : BaseAuditableEntity
{
    public Guid UserId { get; set; }

    public Guid UserLookupName { get; set; }

    public string? RoleTitle { get; set; } // se, sa...

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public int? Gender { get; set; }

    public DateTimeOffset? DateOfBirth { get; set; }

    public string? Address { get; set; }

    public string? PersonalLink { get; set; }

    public string? AboutMe { get; set; }

    public string? LogoImage { get; set; }

    public string? Educations { get; set; } // json

    public string? WorkExperiences { get; set; } // json

    public string? PersonalProjects { get; set; } // json

    public string? Certificates { get; set; } // json
}