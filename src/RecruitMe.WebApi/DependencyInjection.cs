using RecruitMe.Application.Common.Interfaces;
using RecruitMe.Infrastructure.Authentication;
using RecruitMe.WebApi.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddWebServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();

        // scope: create new instance but keep the instance throughout the request
        // transient: create new instance each request
        services.AddScoped<IUser, CurrentUser>();
        services.AddTransient<IDateTime, DateTimeService>();
        services.AddScoped<IJwtProvider, JwtProvider>();

        services.AddHttpContextAccessor();

        return services;
    }
}