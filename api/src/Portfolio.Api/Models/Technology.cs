namespace Portfolio.Api.Models;
public class Technology : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }


    public ICollection<ProjectTechnology> ProjectTechnologies { get; set; } = [];
}