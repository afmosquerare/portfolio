using Portfolio.Api.DTOs.Category;

namespace Portfolio.Api.DTOs.Technology;

public record TechnologyResponse(
    int Id,
    string Name,
    string? IconUrl,
    CategoryResponse Category
);
