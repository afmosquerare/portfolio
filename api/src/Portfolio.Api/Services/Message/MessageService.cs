using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Message;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Messages;

namespace Portfolio.Api.Services.Messages;

public class MessageService(IMessageRepository repository) : IMessageService
{
    public async Task<ErrorOr<MessageResponse>> AddAsync(CreateMessageRequest req)
    {
        var message = req.Adapt<Message>();
        var created = await repository.AddAsync(message);
        return created.Adapt<MessageResponse>();
    }

    public async Task<ErrorOr<Deleted>> DeleteAsync(int id)
    {
        var exists = await repository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Message.NotFound", $"El mensaje con id {id} no existe");
        }
        await repository.DeleteAsync(id);
        return Result.Deleted;
    }

    public async Task<ErrorOr<IEnumerable<MessageResponse>>> GetAllAsync()
    {
        var messages = await repository.GetAllAsync();
        return messages.Adapt<List<MessageResponse>>();
    }

    public async Task<ErrorOr<MessageResponse>> GetByIdAsync(int id)
    {
        var exists = await repository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Message.NotFound", $"El mensaje con id {id} no existe");
        }
        return exists.Adapt<MessageResponse>();
    }

    public async Task<ErrorOr<IEnumerable<MessageResponse>>> GetUnreadAsync()
    {
        var messages = await repository.GetUnreadAsync();
        return messages.Adapt<List<MessageResponse>>();
    }

    public async Task<ErrorOr<MessageResponse>> UpdateAsync(int id, UpdateMessageRequest req)
    {
        var existing = await repository.GetByIdAsync(id);
        if (existing is null)
        {
            return Error.NotFound("Message.NotFound", $"El mensaje con id {id} no existe");
        }
        req.Adapt(existing);
        await repository.UpdateAsync(existing);
        return existing.Adapt<MessageResponse>();
    }
}
