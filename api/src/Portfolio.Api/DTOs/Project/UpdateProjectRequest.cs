
namespace Portfolio.Api.DTOs.Project;

public record UpdateProjectRequest
{
    public string? DemoUrl {get; init;}
    public string? GithubUrl {get; init;}
    public string? ImageUrl {get; init;}
    public int? Order {get; init;}
    public bool? IsVisible {get; init;}

}