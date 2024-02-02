using Microsoft.EntityFrameworkCore;
using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    public DbSet<Company> Companies { get; }
    public DbSet<CompanyReview> CompanyReviews { get; }
    public DbSet<CompanySkill> CompanySkills { get; }
    public DbSet<Job> Jobs { get;  }
    public DbSet<JobSeeker> JobSeekers { get;  }
    public DbSet<JobSkill> JobSkills { get;  }
    public DbSet<Skill> Skills { get;  }
    public DbSet<User> Users { get;  }
    public DbSet<UserSkill> UserSkills { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}