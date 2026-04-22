namespace Portfolio.Api.Models;
public class ProjectTranslation
{
    public int ProjectId {get; set;}
    public Project Project {get; set;} = null!;

    public string LanguageCode {get; set; } = "es";
    public string Title { get; set; } = string.Empty;

    public string Description { get; set;} = string.Empty;

}