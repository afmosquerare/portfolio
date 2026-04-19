using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories.Technologies;

public interface ITechnologyRepository
{
    Task<IEnumerable<Technology>> GetAllAsync(int? categoryId);
    Task<Technology?> GetByIdAsync(int id);
    Task<Technology> AddAsync(Technology technology);
    Task<Technology> UpdateAsync(Technology technology);
    Task DeleteAsync(int id);

    Task<Technology?> GetByIdWithProjectsAsync(int id);

    Task<ICollection<Technology>> GetTechnologiesByProjectIdAsync(int projectId);
}
