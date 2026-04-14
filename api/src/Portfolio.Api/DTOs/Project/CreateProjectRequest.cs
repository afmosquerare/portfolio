namespace Portfolio.Api.DTOs.Project;

public record CreateProjectRequest
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public string? ImageUrl { get; init; }

    public string? GithubUrl { get; init; }
    public string? DemoUrl { get; init; }

    public int? Order { get; init; }

    public bool? IsVisible { get; init; }

}