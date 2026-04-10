namespace Portfolio.Api.Models;
public class Technology : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? IconUrl { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public ICollection<ProjectTechnology> ProjectTechnologies { get; set; } = [];
}