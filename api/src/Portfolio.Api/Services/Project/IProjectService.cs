using ErrorOr;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services.Projects;
public interface IProjectService
{
    Task<ErrorOr<IEnumerable<ProjectResponse>>> GetAllAsync();
    Task<ErrorOr<Deleted>> DeleteAsync(int id);

    Task<ErrorOr<ProjectResponse>> GetByIdAsync(int id);

    Task<ErrorOr<ProjectResponse>> AddAsync(CreateProjectRequest req);
    Task<ErrorOr<ProjectResponse>> UpdateAsync(int id, UpdateProjectRequest req  );
}