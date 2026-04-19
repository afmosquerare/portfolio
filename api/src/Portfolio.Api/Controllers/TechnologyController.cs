using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Services.Technologies;

namespace Portfolio.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/technologies")]
public class TechnologyController(ITechnologyService service) : ApiController
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        => HandleResult( await service.GetAllAsync( categoryId ));

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
        => HandleResult(await service.GetByIdAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTechnologyRequest req)
        => HandleResult(await service.AddAsync(req));

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTechnologyRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));
}