using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories.Technologies;

public interface ITechnologyRepository
{
    Task<IEnumerable<Technology>> GetAllAsync();
    Task<Technology?> GetByIdAsync(int id);
    Task<Technology> AddAsync(Technology technology);
    Task<Technology> UpdateAsync(Technology technology);
    Task DeleteAsync(int id);
    Task<IEnumerable<Technology>> GetByCategoryAsync(int categoryId);

    Task<Technology?> GetByIdWithProjectsAsync(int id);

    Task<ICollection<Technology>> GetTechnologiesByProjectIdAsync(int projectId);
}
