namespace Portfolio.Api.DTOs.Technology;

public record UpdateTechnologyRequest(
    string? Name,
    string? IconUrl,
    int? CategoryId
);
