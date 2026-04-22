using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Technologies;
using Portfolio.Api.Services.Projects;

public class ProjectService(IProjectRepository repository, ITechnologyRepository technologyRepository) : IProjectService
{
    public async Task<ErrorOr<ProjectResponse>> AddAsync(CreateProjectRequest req)
    {
        var project = req.Adapt<Project>();
        project.Order = req.Order ?? 0;
        var created = await repository.AddAsync(project);
        return created.Adapt<ProjectResponse>();
    }

    public async Task<ErrorOr<Created>> AddTechnologyAsync(int projectId, int technologyId)
    {
        var technology = await technologyRepository.GetByIdAsync(technologyId);
        if (technology is null)
        {
            return Error.NotFound("Technology.NotFound", $"La tecnologia con el id {technologyId} no existe");
        }

        var project = await repository.GetByIdAsync(projectId);
        if (project is null)
        {
            return Error.NotFound("Project.NotFound", $"La project con el id {projectId} no existe");
        }

        var projectTechnology = new ProjectTechnology
        {
            ProjectId = projectId,
            TechnologyId = technologyId
        };

        await repository.AddTechnologyAsync(projectTechnology);
        return Result.Created;
    }

    public async Task<ErrorOr<Deleted>> DeleteAsync(int id)
    {
        var exists = await repository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Project.NotFound", $"El proyecto con el {id} no existe");
        }
        await repository.DeleteAsync(id);
        return Result.Deleted;
    }

    public async Task<ErrorOr<IEnumerable<ProjectResponse>>> GetAllAsync(int? technologyId, string? lang, bool? isVisible)
    {
        var projects = await repository.GetAllAsync(technologyId, lang, isVisible);
        return projects.Adapt<List<ProjectResponse>>();
    }

    public async Task<ErrorOr<ProjectResponse>> GetByIdAsync(int id)
    {
        var exists = await repository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Project.NotFound", $"El proyecto con el {id} no existe");
        }
        return exists.Adapt<ProjectResponse>();
    }

    public async Task<ErrorOr<ProjectResponse>> UpdateAsync(int id, UpdateProjectRequest req)
    {
        var existing = await repository.GetByIdAsync(id);
        if (existing is null)
        {
            return Error.NotFound("Project.NotFound", $"El proyecto con el {id} no existe");
        }
        req.Adapt(existing);
        await repository.UpdateAsync(existing);
        return existing.Adapt<ProjectResponse>();
    }
}