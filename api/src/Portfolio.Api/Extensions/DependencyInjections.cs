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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Portfolio.Api.Services.Auth;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Portfolio.Api.Services.Storage;
using Portfolio.Api.Services.Categories;

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

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthService, AuthService>();

        services.AddScoped<IStorageService, AzureStorageService>();
        return services;
    }

    public static IServiceCollection AddFluentValidation(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<Program>();
        return services;
    }

    public static IServiceCollection AddJwtAuthentication( this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<JwtService>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["JwtSettings:Issuer"],
            ValidAudience = config["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["JwtSettings:Secret"]!))
        };
        });

        return services;
    }



}