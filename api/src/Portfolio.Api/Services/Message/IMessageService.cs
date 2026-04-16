using ErrorOr;
using Portfolio.Api.DTOs.Message;

namespace Portfolio.Api.Services.Messages;

public interface IMessageService
{
    Task<ErrorOr<IEnumerable<MessageResponse>>> GetAllAsync();
    Task<ErrorOr<MessageResponse>> GetByIdAsync(int id);
    Task<ErrorOr<MessageResponse>> AddAsync(CreateMessageRequest req);
    Task<ErrorOr<MessageResponse>> UpdateAsync(int id, UpdateMessageRequest req);
    Task<ErrorOr<Deleted>> DeleteAsync(int id);
    Task<ErrorOr<IEnumerable<MessageResponse>>> GetUnreadAsync();
}
