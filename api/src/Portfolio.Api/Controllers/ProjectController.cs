using ErrorOr;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Projects;

[ApiController]
[Authorize]
[Route("api/projects")]
public class ProjectController(IProjectService service) : ApiController
{
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => HandleResult(await service.GetByIdAsync(id));

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? technologyId, [FromQuery] string? lang, [FromQuery] bool? isVisible)
        => HandleResult(await service.GetAllAsync(technologyId, lang, isVisible));

    [HttpPost("{projectId}/technologies/{technologyId}")]
    public async Task<IActionResult> AddTechnology(int projectId, int technologyId)
        => HandleResult(await service.AddTechnologyAsync(projectId, technologyId));
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectRequest req)
        => HandleResult(await service.AddAsync(req));

    [AllowAnonymous]
    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProjectRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));

    [AllowAnonymous]
    [HttpPost("{projectId}/translations")]
    public async Task<IActionResult> AddTranslation(int projectId, CreateProjectTranslationRequest req)
    => HandleResult(await service.AddTranslationAsync(projectId, req));

    [AllowAnonymous]
    [HttpGet("{projectId}/translations/{lang}")]
    public async Task<IActionResult> GetTranslation(int projectId, string lang)
        => HandleResult(await service.GetTranslationAsync(projectId, lang));

    [AllowAnonymous]
    [HttpPatch("{projectId}/translations/{lang}")]
    public async Task<IActionResult> UpdateTranslation(int projectId, string lang, UpdateProjectTranslationRequest req)
        => HandleResult(await service.UpdateTranslationAsync(projectId, lang, req));
}