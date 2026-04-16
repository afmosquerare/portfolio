using FluentValidation;
using FluentValidation.AspNetCore;
using Portfolio.Api.Repositories;
using Portfolio.Api.Repositories.Interfaces;
using Portfolio.Api.Repositories.Projects;
using Portfolio.Api.Repositories.Technologies;
using Portfolio.Api.Repositories.Messages;
using Portfolio.Api.Services.Interfaces;
using Portfolio.Api.Services.Projects;
using Portfolio.Api.Services.Technologies;
using Portfolio.Api.Services.Messages;

namespace Portfolio.Api.Extensions;

public static class DependencyInjections
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IProjectService, ProjectService>();

        services.AddScoped<ITechnologyService, TechnologyService>();
        services.AddScoped<ITechnologyRepository, TechnologyRepository>();

        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped<IMessageService, MessageService>();
        return services;
    }

    public static IServiceCollection AddFluentValidation(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Program>();
        return services;
    }



}