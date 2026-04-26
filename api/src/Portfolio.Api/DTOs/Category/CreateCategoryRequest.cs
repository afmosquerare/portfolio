namespace Portfolio.Api.DTOs.Category;

public record CreateCategoryRequest
{
    public string? Icon { get; init; }

    public ICollection<CreateCategoryTranslationRequest> CategoryTranslations { get; init; } = [];
}
