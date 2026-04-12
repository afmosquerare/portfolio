using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Interfaces;
using Portfolio.Api.Services.Interfaces;

public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<ErrorOr<CategoryResponse>> AddAsync(CreateCategoryRequest req)
    {
        var category = req.Adapt<Category>();
        var created = await repository.AddAsync(category);
        return new CategoryResponse(created.Id, created.Name, created.IconUrl);
    }

    public async Task<ErrorOr<Deleted>> DeleteAsync(int id)
    {
        var category = await repository.GetByIdAsync(id);

        if (category is null)
        {
            return Error.NotFound("Category.NotFound", "Category not found");
        }
        await repository.DeleteAsync(id);
        return Result.Deleted;
    }

    public async Task<ErrorOr<IEnumerable<CategoryResponse>>> GetAllAsync()
    {
        var categories =  await repository.GetAllAsync();
        return categories.Adapt<List<CategoryResponse>>();
    }

    public async Task<ErrorOr<CategoryResponse>> GetByIdAsync(int id)
    {
        var category = await repository.GetByIdAsync( id );
        if(category is null)
        {
            return Error.NotFound("Category.NotFound", "Category not found");
        }
        return category.Adapt<CategoryResponse>();
    }

    public async Task<ErrorOr<CategoryResponse>> UpdateAsync(int id, UpdateCategoryRequest req)
    {
        var existing = await repository.GetByIdAsync(id);
        if(existing is null)
        {
            return Error.NotFound("Category.NotFound", "Category not found");
        }
        req.Adapt(existing);
        var updated = await repository.UpdateAsync( existing );
        return updated.Adapt<CategoryResponse>();
    }

}