using ErrorOr;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Project;
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
    public async Task<IActionResult> GetAll([FromQuery] int? technologyId)
        => HandleResult(await service.GetAllAsync(technologyId));

    [HttpPost("{projectId}/technologies/{technologyId}")]
    public async Task<IActionResult> AddTechnology(int projectId, int technologyId)
        => HandleResult(await service.AddTechnologyAsync(projectId, technologyId));

    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectRequest req)
        => HandleResult(await service.AddAsync(req));

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProjectRequest req)
        => HandleResult(await service.UpdateAsync(id, req));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => HandleDeletedResult(await service.DeleteAsync(id));
}