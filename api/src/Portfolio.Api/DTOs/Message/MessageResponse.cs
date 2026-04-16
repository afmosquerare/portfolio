namespace Portfolio.Api.DTOs.Message;

public record MessageResponse(
    int Id,
    string Name,
    string Email,
    string Body,
    bool IsRead,
    DateTime CreatedAt
);
