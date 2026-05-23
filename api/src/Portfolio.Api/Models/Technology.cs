namespace Portfolio.Api.Models;
public class Technology : BaseEntity
{
    public string Name { get; set; } = string.Empty;


    public ICollection<ProjectTechnology> ProjectTechnologies { get; set; } = [];
}