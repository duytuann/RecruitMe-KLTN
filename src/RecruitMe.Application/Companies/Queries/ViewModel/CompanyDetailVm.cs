using RecruitMe.Domain.Entities;
using RecruitMe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruitMe.Application.Companies.Queries.ViewModel
{
    public class CompanyDetailVm
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid UserLookupName { get; set; }

        public CompanyType Type { get; set; }

        public string? Address { get; set; }

        public string? CompanySize { get; set; }

        public string? Country { get; set; }

        public string? CompanyOverview { get; set; }

        public string? LogoImage { get; set; }

        public string? CoverPhoto { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Website { get; set; }

        public string? ProfileUrl { get; set; }

        public string? About { get; set; }

        public string? Title { get; set; }

        public string? Email { get; set; }

        public List<Job>? OpenJobs { get; set; }

        public List<CompanyReview>? CompanyReviews { get; set; }
    }
}
