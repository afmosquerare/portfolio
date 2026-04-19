using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Services.Projects;

[ApiController]
[Route("api/projects")]
public class ProjectController(IProjectService service) : ApiController
{

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await service.GetByIdAsync(id);
        return result.Match(
            project => Ok(project),
            errors => Problem(errors)
        );
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? technologyId)
    {
        var result = await service.GetAllAsync(technologyId);
        return result.Match(
            projects => Ok(projects),
            errors => Problem(errors)
        );
    }

    [HttpPost("{projectId}/technologies/{technologyId}")]
    public async Task<IActionResult> AddTechnology(int projectId, int technologyId)
    {

        var result = await service.AddTechnologyAsync(projectId, technologyId);
        return result.Match(
            projects => Ok(projects),
            errors => Problem(errors)
        );
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProjectRequest req)
    {
        var result = await service.AddAsync(req);
        return result.Match(
            project => Ok(project),
            errors => Problem(errors)
        );
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProjectRequest req)
    {
        var result = await service.UpdateAsync(id, req);
        return result.Match(
            project => Ok(project),
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