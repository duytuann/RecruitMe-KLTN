using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class JobSeeker : BaseAuditableEntity
{
    public EGender? Gender { get; set; }

    public DateTimeOffset? DateOfBirth { get; set; }

    public string? Address { get; set; }

    public string? PersonalLink { get; set; }

    public string? AboutMe { get; set; }

    public string? Educations { get; set; } // json

    public string? WorkExperiences { get; set; } // json

    public string? PersonalProjects { get; set; } // json

    public string? Certificates { get; set; } // json
}