using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Message;
using Portfolio.Api.Services.Messages;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/messages")]
public class MessageController(IMessageService service) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await service.GetAllAsync();
        return result.Match(
            messages => Ok(messages),
            errors => Problem(errors)
        );
    }

    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread()
    {
        var result = await service.GetUnreadAsync();
        return result.Match(
            messages => Ok(messages),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await service.GetByIdAsync(id);
        return result.Match(
            message => Ok(message),
            errors => Problem(errors)
        );
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMessageRequest req)
    {
        var result = await service.AddAsync(req);
        return result.Match(
            message => Ok(message),
            errors => Problem(errors)
        );
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateMessageRequest req)
    {
        var result = await service.UpdateAsync(id, req);
        return result.Match(
            message => Ok(message),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await service.DeleteAsync(id);
        return result.Match(
            deleted => NoContent(),
            errors => Problem(errors)
        );
    }
}
