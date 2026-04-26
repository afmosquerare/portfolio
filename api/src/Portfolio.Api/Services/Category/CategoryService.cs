using ErrorOr;
using Mapster;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Interfaces;
using Portfolio.Api.Services.Interfaces;

namespace Portfolio.Api.Services.Categories;
public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<ErrorOr<CategoryResponse>> AddAsync(CreateCategoryRequest req)
    {
        var category = new Category { Icon = req.Icon };
        var created = await repository.AddAsync(category);
        
        foreach (var translationReq in req.CategoryTranslations)
        {
            var translation = translationReq.Adapt<CategoryTranslation>();
            translation.CategoryId = created.Id;
            await repository.AddTranslationAsync(translation);
        }
        
        var createdWithTranslations = await repository.GetByIdAsync(created.Id);
        if (createdWithTranslations is null)
            return Error.Failure("Category.Creation", "No se pudo crear la categoría");
            
        return createdWithTranslations.Adapt<CategoryResponse>();
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

    public async Task<ErrorOr<CategoryTranslationResponse>> AddTranslationAsync(int categoryId, CreateCategoryTranslationRequest req)
    {
        var category = await repository.GetByIdAsync(categoryId);
        if (category is null)
            return Error.NotFound("Category.NotFound", $"La categoría con el id {categoryId} no existe");

        var translation = req.Adapt<CategoryTranslation>();
        translation.CategoryId = categoryId;

        var created = await repository.AddTranslationAsync(translation);
        return created.Adapt<CategoryTranslationResponse>();
    }

    public async Task<ErrorOr<CategoryTranslationResponse>> GetTranslationAsync(int categoryId, string lang)
    {
        var category = await repository.GetByIdAsync(categoryId);
        if (category is null)
            return Error.NotFound("Category.NotFound", $"La categoría con el id {categoryId} no existe");
        var translation = await repository.GetTranslationAsync(categoryId, lang);
        if (translation is null)
            return Error.NotFound("Translation.NotFound", $"La traducción con el codigo {lang} no existe");
        return translation.Adapt<CategoryTranslationResponse>();
    }

    public async Task<ErrorOr<CategoryTranslationResponse>> UpdateTranslationAsync(int categoryId, string lang, UpdateCategoryTranslationRequest req)
    {
        var category = await repository.GetByIdAsync(categoryId);
        if (category is null)
        {
            return Error.NotFound("Category.NotFound", $"La categoría con el id {categoryId} no existe");
        }
        var translation = await repository.GetTranslationAsync(categoryId, lang);
        if (translation is null)
        {
            return Error.NotFound("Translation.NotFound", $"La traduccion no existe");
        }
        req.Adapt(translation);
        await repository.UpdateTranslationAsync(translation);
        return translation.Adapt<CategoryTranslationResponse>();
    }
}