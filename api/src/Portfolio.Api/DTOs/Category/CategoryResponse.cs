namespace Portfolio.Api.DTOs.Category;

public record CategoryResponse(int Id, string? IconUrl)
{
    public ICollection<CategoryTranslationResponse> Translations { get; init; } = [];
}
