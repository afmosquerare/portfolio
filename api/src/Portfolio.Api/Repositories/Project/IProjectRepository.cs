using Portfolio.Api.Models;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync(int? technologyId);
    Task<Project?> GetByIdAsync(int id );
    Task<Project> AddAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task AddTechnologyAsync(ProjectTechnology projectTechnology);

    Task DeleteAsync(int id);

}