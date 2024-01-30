using RecruitMe.Domain.Common;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Entities;

public class User : BaseAuditableEntity
{
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public UserType UserType { get; set; }
}