using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Message;
using Portfolio.Api.Services.Messages;

namespace Portfolio.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/messages")]
public class MessageController(IMessageService service) : ApiController
{

    
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => HandleResult(await service.GetAllAsync());

    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread()
        => HandleResult(await service.GetUnreadAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => HandleResult(await service.GetByIdAsync(id));

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Create([FromBody] CreateMessageRequest req)
    {
        // Honeypot check
        if (!string.IsNullOrEmpty(req.WebsiteUrl))
        {
            return Ok();
        }

        return HandleResult(await service.AddAsync(req));
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateMessageRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));
}