using Microsoft.EntityFrameworkCore;
using RecruitMe.Domain.Entities;
using System.Reflection;

namespace RecruitMe.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Company> Companies { get; set; }
    public DbSet<CompanyReview> CompanyReviews { get; set; }
    public DbSet<CompanySkill> CompanySkills { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<JobSeeker> JobSeekers { get; set; }
    public DbSet<JobSkill> JobSkills { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserSkill> UserSkills { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}

