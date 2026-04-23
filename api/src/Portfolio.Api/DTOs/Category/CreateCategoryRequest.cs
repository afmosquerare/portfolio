namespace Portfolio.Api.DTOs.Category;

public record CreateCategoryRequest
{
    public string? IconUrl { get; init; }

    public ICollection<CreateCategoryTranslationRequest> CategoryTranslations { get; init; } = [];
}
