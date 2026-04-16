namespace Portfolio.Api.DTOs.Message;

public record CreateMessageRequest(
    string Name,
    string Email,
    string Body
);
