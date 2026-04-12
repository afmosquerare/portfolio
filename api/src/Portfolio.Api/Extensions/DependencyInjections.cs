using FluentValidation;
using FluentValidation.AspNetCore;
using Portfolio.Api.Repositories;
using Portfolio.Api.Repositories.Interfaces;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Extensions;

public static class DependencyInjections
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        return services;
    }

    public static IServiceCollection AddFluentValidation(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Program>();
        return services;
    }



}