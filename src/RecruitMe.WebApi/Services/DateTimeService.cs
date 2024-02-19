using RecruitMe.Application.Common.Interfaces;

namespace RecruitMe.WebApi.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}

