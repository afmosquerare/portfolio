using ErrorOr;
using Portfolio.Api.DTOs.Technology;

namespace Portfolio.Api.Services.Technologies;

public interface ITechnologyService
{
    Task<ErrorOr<IEnumerable<TechnologyResponse>>> GetAllAsync();
    Task<ErrorOr<TechnologyResponse>> GetByIdAsync(int id);
    Task<ErrorOr<TechnologyResponse>> AddAsync(CreateTechnologyRequest req);
    Task<ErrorOr<TechnologyResponse>> UpdateAsync(int id, UpdateTechnologyRequest req);
    Task<ErrorOr<Deleted>> DeleteAsync(int id);
}
