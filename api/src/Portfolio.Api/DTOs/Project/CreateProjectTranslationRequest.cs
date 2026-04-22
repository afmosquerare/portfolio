namespace Portfolio.Api.Models;
public record CreateProjectTranslationRequest
{
    public string LanguageCode {get; set; } = "es";
    public string Title { get; set; } = string.Empty;
    public string Description { get; set;} = string.Empty;
}