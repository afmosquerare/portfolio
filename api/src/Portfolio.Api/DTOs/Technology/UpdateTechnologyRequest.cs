namespace Portfolio.Api.DTOs.Technology;

public record UpdateTechnologyRequest(
    string? Name,
    string? Icon,
    int? CategoryId
);
