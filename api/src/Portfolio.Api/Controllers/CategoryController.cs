using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController(ICategoryService service) : ApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await service.GetAllAsync();
        return result.Match(
            categories => Ok(categories),
            errors => Problem(errors)
            // errors => Problem(statusCode: StatusCodes.Status500InternalServerError)
        );
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await service.GetByIdAsync(id);
        return result.Match(
            category => Ok(category),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await service.DeleteAsync(id);
        if (result.IsError)
        {
            Console.WriteLine( result.Errors.First() );
        }
        return result.Match<IActionResult>(
            category => NoContent(),
            errors => Problem(errors)
            );
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update( int id, UpdateCategoryRequest req)
    {
        var updated = await service.UpdateAsync(id, req);
        return updated.Match(
            updated => Ok(updated),
            errors => Problem(errors)
        );
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest req)
    {
        var created = await service.AddAsync(req);
        return created.Match(
            created => Ok(created),
            errors => Problem(errors)
        );
    }



}


