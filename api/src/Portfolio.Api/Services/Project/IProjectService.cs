using ErrorOr;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services.Projects;

public interface IProjectService
{
    Task<ErrorOr<IEnumerable<ProjectResponse>>> GetAllAsync(int? technologyId, string? lang, bool? isVisible);
    Task<ErrorOr<Deleted>> DeleteAsync(int id);

    Task<ErrorOr<Created>> AddTechnologyAsync(int projectId, int technologyId);
    Task<ErrorOr<Deleted>> RemoveTechnologyAsync(int projectId, int technologyId);

    Task<ErrorOr<ProjectTranslationResponse>> AddTranslationAsync(int projectId, CreateProjectTranslationRequest req);

    Task<ErrorOr<ProjectTranslationResponse>> GetTranslationAsync( int projectId, string lang );
    Task<ErrorOr<ProjectTranslationResponse>> UpdateTranslationAsync( int projectId, string lang, UpdateProjectTranslationRequest req);

    Task<ErrorOr<ProjectResponse>> GetByIdAsync(int id);
    
    Task<ErrorOr<ProjectResponse>> AddAsync(CreateProjectRequest req);
    Task<ErrorOr<ProjectResponse>> UpdateAsync(int id, UpdateProjectRequest req);
}