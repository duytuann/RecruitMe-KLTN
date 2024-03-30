using RecruitMe.Domain.Enums;

namespace RecruitMe.Domain.Common;

public abstract class BaseAuditableEntity : BaseEntity
{
    public string? Title { get; set; }

    public bool? IsDelete { get; set; }

    public int StateCode { get; set; }

    public DateTimeOffset Created { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTimeOffset LastModified { get; set; }

    public Guid? LastModifiedBy { get; set; }
}
