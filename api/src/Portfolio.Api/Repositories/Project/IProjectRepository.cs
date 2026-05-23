using Portfolio.Api.Models;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync(int? technologyId, string? lang, bool? isVisible);
    Task<Project?> GetByIdAsync(int id );
    Task<Project> AddAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task AddTechnologyAsync(ProjectTechnology projectTechnology);
    Task RemoveTechnologyAsync(int projectId, int technologyId);

    Task<ProjectTranslation?> GetTranslationAsync( int projectId, string lang );
    Task<ProjectTranslation> AddTranslationAsync( ProjectTranslation translation );

    Task UpdateTranslationAsync( ProjectTranslation translation );

    Task DeleteAsync(int id);

}