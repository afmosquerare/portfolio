namespace Portfolio.Api.DTOs.Technology;

public record CreateTechnologyRequest(
    string Name,
    string? IconUrl,
    int CategoryId
);
