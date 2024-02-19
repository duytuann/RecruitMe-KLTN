using MediatR;
using Microsoft.EntityFrameworkCore;
using RecruitMe.Application.Common.Interfaces;

namespace RecruitMe.Application.Users.Command.Login;

public record LoginCommand : IRequest<string>
{
    public string? Email { get; init; }
    public string? Password { get; init; }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    public readonly IApplicationDbContext _context;
    public readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(IApplicationDbContext context, IJwtProvider jwtProvider)
    {
        _context = context;
        _jwtProvider = jwtProvider;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        if (request.Email == null || request.Password == null)
        {
            throw new ArgumentException("UserName and Password is required");
        }

        var user = await _context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync();

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

        return token;
    }
}