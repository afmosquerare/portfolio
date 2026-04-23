using Mapster;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Models;

public static class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig.GlobalSettings.Default.IgnoreNullValues(true);

        TypeAdapterConfig<Project, ProjectResponse>.NewConfig()
            .Map(dest => dest.Technologies,
            src => src.ProjectTechnologies.Select(pt => pt.Technology.Adapt<TechnologyResponse>()))
            .Map(des => des.Translations, src => src.ProjectTranslations);
        TypeAdapterConfig<Category, CategoryResponse>.NewConfig()
            .Map(dest => dest.Translations, src => src.CategoryTranslations);

    }
}