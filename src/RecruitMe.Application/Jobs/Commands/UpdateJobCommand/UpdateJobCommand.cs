using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RecruitMe.Application.Jobs.Commands.UpdateJobCommand;

public record UpdateJobCommand : IRequest<Job>
{
    public Guid Id { get; init; }

    public DateTimeOffset StartDate { get; init; }

    public DateTimeOffset EndDate { get; init; }

    public string? Title { get; init; }

    public int? Experience { get; init; }

    public string? Description { get; init; }

    public int? JobType { get; init; }

    public string? PhoneNumber { get; init; }

    public int? Gender { get; init; }

    public int? SalaryType { get; init; }

    public string? MinSalary { get; init; }

    public string? MaxSalary { get; init; }

    public string? Tag { get; init; }
}

public class UpdateJobCommandHandler : IRequestHandler<UpdateJobCommand, Job>
{
    private readonly IApplicationDbContext _context;

    public UpdateJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Job> Handle(UpdateJobCommand request, CancellationToken cancellationToken)
    {
        var job = await _context.Jobs.Where(item => item.Id == request.Id).FirstOrDefaultAsync();

        if (job == null)
        {
            throw new ArgumentException("Can not file an entity of this Id!");
        }

        job.StartDate = request.StartDate;
        job.EndDate = request.EndDate;
        job.Title = request.Title;
        job.Description = request.Description;
        job.Experience = request.Experience;
        job.JobType = request.JobType;
        job.PhoneNumber = request.PhoneNumber;
        job.Gender = request.Gender;
        job.SalaryType = request.SalaryType;
        job.MinSalary = request.MinSalary;
        job.MaxSalary = request.MaxSalary;
        job.Tag = request.Tag;


        await _context.SaveChangesAsync(cancellationToken);

        return job;
    }
}
