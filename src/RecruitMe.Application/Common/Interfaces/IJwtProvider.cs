using RecruitMe.Domain.Entities;

namespace RecruitMe.Application.Common.Interfaces;

public interface IJwtProvider
{
    string Generate(User user);
}
