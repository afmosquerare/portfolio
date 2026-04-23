namespace Portfolio.Api.DTOs.Category;

public record CreateCategoryTranslationRequest
{
    public string LanguageCode { get; init; } = "es";
    public string Name { get; init; } = string.Empty;
}
