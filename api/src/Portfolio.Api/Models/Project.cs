
namespace Portfolio.Api.Models;
public class Project : BaseEntity
{
    public ICollection<ProjectTranslation> ProjectTranslations { get; set;} = [];
    public ICollection<ProjectTechnology> ProjectTechnologies { get; set; } = [];
    public string? ImageUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? DemoUrl { get; set; }
    public int Order { get; set; }
    public bool IsVisible { get; set; }
}