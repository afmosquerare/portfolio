using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Interfaces;
using Portfolio.Api.Repositories.Technologies;

namespace Portfolio.Api.Services.Technologies;

public class TechnologyService(ITechnologyRepository technologyRepository, ICategoryRepository categoryRepository) : ITechnologyService
{
    public async Task<ErrorOr<TechnologyResponse>> AddAsync(CreateTechnologyRequest req)
    {
        var category = await categoryRepository.GetByIdAsync(req.CategoryId);
        if (category is null)
        {
            return Error.NotFound("Category.NotFound", $"La categoría con el id {req.CategoryId} no existe");
        }
        var technology = req.Adapt<Technology>();
        var created = await technologyRepository.AddAsync(technology);
        return created.Adapt<TechnologyResponse>();
    }

    public async Task<ErrorOr<Deleted>> DeleteAsync(int id)
    {
        var exists = await technologyRepository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Technology.NotFound", $"La tecnología con id {id} no existe");
        }
        await technologyRepository.DeleteAsync(id);
        return Result.Deleted;
    }

    public async Task<ErrorOr<IEnumerable<TechnologyResponse>>> GetAllAsync(int? categoryId)
    {
        var technologies = await technologyRepository.GetAllAsync(categoryId);
        return technologies.Adapt<List<TechnologyResponse>>();
    }


    public async Task<ErrorOr<TechnologyResponse>> GetByIdAsync(int id)
    {
        var exists = await technologyRepository.GetByIdAsync(id);
        if (exists is null)
        {
            return Error.NotFound("Technology.NotFound", $"La tecnología con id {id} no existe");
        }
        return exists.Adapt<TechnologyResponse>();
    }

    public async Task<ErrorOr<TechnologyResponse>> UpdateAsync(int id, UpdateTechnologyRequest req)
    {
        var existing = await technologyRepository.GetByIdAsync(id);
        if (existing is null)
        {
            return Error.NotFound("Technology.NotFound", $"La tecnología con id {id} no existe");
        }
        req.Adapt(existing);
        await technologyRepository.UpdateAsync(existing);
        return existing.Adapt<TechnologyResponse>();
    }
}
