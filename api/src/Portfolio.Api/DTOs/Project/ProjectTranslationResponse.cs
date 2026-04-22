namespace Portfolio.Api.DTOs.Project;
public record ProjectTranslationResponse
{
    public string Title {get; init;} = string.Empty;
    public string Description {get; init; } = string.Empty;
}