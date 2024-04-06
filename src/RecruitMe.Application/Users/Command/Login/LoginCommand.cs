using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Domain.Enums;

namespace RecruitMe.Application.Users.Command.Login;

public class LoginResult
{
    public string AccessToken { get; set; }
    public Guid UserId { get; set; }
    public string Title { get; set; }
}

public record LoginCommand : IRequest<LoginResult>
{
    public string? Email { get; init; }
    public string? Password { get; init; }
    public UserType UserType { get; init; }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResult>
{
    public readonly IApplicationDbContext _context;
    public readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(IApplicationDbContext context, IJwtProvider jwtProvider)
    {
        _context = context;
        _jwtProvider = jwtProvider;
    }

    public async Task<LoginResult> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        if (request.Email == null || request.Password == null)
        {
            throw new ArgumentException("UserName and Password is required");
        }

        var user = await _context.Users.Where(u => u.Email == request.Email && u.UserType == request.UserType).FirstOrDefaultAsync();

        if (user == null)
        {
            throw new ArgumentException("Can not found user");
        }

        var verifiedPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);

        if (!verifiedPassword)
        {
            throw new ArgumentException("Password is incorrect");
        }

        string token = _jwtProvider.Generate(user);

        return new LoginResult()
        {
            AccessToken = token,
            UserId = user.Id,
            Title = user.Title
        };
    }
}