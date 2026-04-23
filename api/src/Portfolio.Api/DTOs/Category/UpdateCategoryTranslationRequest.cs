namespace Portfolio.Api.DTOs.Category;

public record UpdateCategoryTranslationRequest
{
    public string Name { get; init; } = string.Empty;
}
