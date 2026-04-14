
namespace Portfolio.Api.DTOs.Project;

public record UpdateProjectRequest
{
    public string? Title {get; init;}
    public string? Description  {get; init;}
    public string? DemoUrl {get; init;}
    public string? GithubUrl {get; init;}
    public string? ImageUrl {get; init;}
    public int? Order {get; init;}
    public bool? IsVisible {get; init;}


}