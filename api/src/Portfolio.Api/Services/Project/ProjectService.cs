using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Models;
using Portfolio.Api.Services.Projects;

public class ProjectService(IProjectRepository repository) : IProjectService
{
    public async Task<ErrorOr<ProjectResponse>> AddAsync(CreateProjectRequest req)
    {
        var project = req.Adapt<Project>();
        project.Order = req.Order ?? 0;
        var created = await repository.AddAsync(project);
        return created.Adapt<ProjectResponse>();
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

    public async Task<ErrorOr<IEnumerable<ProjectResponse>>> GetAllAsync()
    {
        var projects = await repository.GetAllAsync();
        return projects.Adapt<List<ProjectResponse>>();
    }

    public async Task<ErrorOr<ProjectResponse>> GetByIdAsync(int id)
    {
        var exists = await repository.GetByIdAsync( id );
        if (exists is null)
        {
            return Error.NotFound("Project.NotFound", $"El proyecto con el {id} no existe");
        }
        return exists.Adapt<ProjectResponse>();
    }

    public async Task<ErrorOr<ProjectResponse>> UpdateAsync(int id, UpdateProjectRequest req)
    {
        var existing = await repository.GetByIdAsync( id );
        if (existing is null)
        {
            return Error.NotFound("Project.NotFound", $"El proyecto con el {id} no existe");
        }
        req.Adapt(existing);
        await repository.UpdateAsync( existing );
        return existing.Adapt<ProjectResponse>();
    }
}