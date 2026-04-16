using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Services.Technologies;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/technologies")]
public class TechnologyController(ITechnologyService service) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
    {
        var result = categoryId.HasValue
        ? await service.GetByCategoryAsync(categoryId.Value)
        : await service.GetAllAsync();
        return result.Match(
            technologies => Ok(technologies),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await service.GetByIdAsync(id);
        return result.Match(
            technology => Ok(technology),
            errors => Problem(errors)
        );
    }


    [HttpPost]
    public async Task<IActionResult> Create(CreateTechnologyRequest req)
    {
        var result = await service.AddAsync(req);
        return result.Match(
            technology => Ok(technology),
            errors => Problem(errors)
        );
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateTechnologyRequest req)
    {
        var result = await service.UpdateAsync(id, req);
        return result.Match(
            technology => Ok(technology),
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
