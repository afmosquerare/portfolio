using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories.Messages;

public interface IMessageRepository
{
    Task<IEnumerable<Message>> GetAllAsync();
    Task<Message?> GetByIdAsync(int id);
    Task<Message> AddAsync(Message message);
    Task<Message> UpdateAsync(Message message);
    Task DeleteAsync(int id);
    Task<IEnumerable<Message>> GetUnreadAsync();
}
