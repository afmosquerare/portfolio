using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;
using System.Linq;

namespace Portfolio.Api.Repositories.Messages;

public class MessageRepository(PortfolioDbContext context) : IMessageRepository
{
    public async Task<Message> AddAsync(Message message)
    {
        await context.Messages.AddAsync(message);
        await context.SaveChangesAsync();
        return message;
    }

    public async Task DeleteAsync(int id)
    {
        await context.Messages.Where(m => m.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<Message>> GetAllAsync()
    {
        return await context.Messages
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<Message?> GetByIdAsync(int id)
    {
        return await context.Messages.FindAsync(id);
    }

    public async Task<IEnumerable<Message>> GetUnreadAsync()
    {
        return await context.Messages
            .Where(m => !m.IsRead)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<Message> UpdateAsync(Message message)
    {
        context.Messages.Update(message);
        await context.SaveChangesAsync();
        return message;
    }
}
