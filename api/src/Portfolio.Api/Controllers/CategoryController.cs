using ErrorOr;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/categories")]
public class CategoryController(ICategoryService service) : ApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => HandleResult(await service.GetAllAsync());

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => HandleResult(await service.GetByIdAsync(id));

    [AllowAnonymous]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCategoryRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest req)
        => HandleResult( await service.AddAsync(req));

    [AllowAnonymous]
    [HttpPost("{categoryId}/translations")]
    public async Task<IActionResult> CreateTranslation(int categoryId, CreateCategoryTranslationRequest req)
        => HandleResult(await service.AddTranslationAsync(categoryId, req));

    [AllowAnonymous]
    [HttpGet("{categoryId}/translations/{lang}")]
    public async Task<IActionResult> GetTranslation(int categoryId, string lang)
        => HandleResult(await service.GetTranslationAsync(categoryId, lang));

    [AllowAnonymous]
    [HttpPatch("{categoryId}/translations/{lang}")]
    public async Task<IActionResult> UpdateTranslation(int categoryId, string lang, UpdateCategoryTranslationRequest req)
        => HandleResult(await service.UpdateTranslationAsync(categoryId, lang, req));
}


