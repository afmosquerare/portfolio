using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Models;

namespace Portfolio.Api.DTOs.Project;

public record CreateProjectRequest
{
    public string? ImageUrl { get; init; }

    public string? GithubUrl { get; init; }
    public string? DemoUrl { get; init; }

    public int? Order { get; init; }

    public bool? IsVisible { get; init; }

    public ICollection<CreateProjectTranslationRequest> ProjectTranslations {get; init;} = [];


}