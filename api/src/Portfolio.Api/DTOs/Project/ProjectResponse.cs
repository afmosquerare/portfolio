using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Models;

namespace Portfolio.Api.DTOs.Project;

public record ProjectResponse
{
    public int Id { get; init;}
    public string Title { get; init;}
    public string Description {get; init;}

    public string? ImageUrl {get; set;}
    public string? DemoUrl {get;set;}
    public string? GithubUrl {get; set;}

    public int Order {get;set;}

    public bool IsVisible {get;set;}

    public DateTime CreatedAt {get; set;}

    public ICollection<TechnologyResponse> Technologies {get; set;} = [];


}