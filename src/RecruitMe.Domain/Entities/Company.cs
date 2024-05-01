using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class Company : BaseAuditableEntity
{
    public Guid UserId { get; set; }

    public Guid UserLookupName { get; set; }

    public string? Address { get; set; }

    public string? CompanySize { get; set; }

    public string? Country { get; set; }

    public string? CompanyOverview { get; set; }

    public string? LogoImage { get; set; }

    public string? CoverPhoto { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Website {  get; set; }

    public string? ProfileUrl { get; set; }

    public string? About { get; set; }
 
    // category
}