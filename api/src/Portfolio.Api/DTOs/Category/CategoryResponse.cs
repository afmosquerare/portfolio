namespace Portfolio.Api.DTOs.Category;

public record CategoryResponse(int Id, string? Icon)
{
    public ICollection<CategoryTranslationResponse> Translations { get; init; } = [];
}
