namespace Portfolio.Api.DTOs.Category;

public record CategoryTranslationResponse
{
    public string LanguageCode { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
}
