using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecruitMe.Application.Companies.Queries.ViewModel
{
    public class CompanyReviewVm
    {
        public string? JobSeeker { get; set; }

        public DateTimeOffset? CreateDate { get; set; }

        public string? Avatar {  get; set; }

        public int? Rating { get; set; }

        public string? Review { get; set; }
    }
}
