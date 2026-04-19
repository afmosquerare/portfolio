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
        => HandleResult(await service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => HandleResult(await service.GetByIdAsync(id));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCategoryRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest req)
        => HandleResult(await service.AddAsync(req));



}


