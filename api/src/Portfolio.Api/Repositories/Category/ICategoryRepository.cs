using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(int id);
    Task<Category> AddAsync(Category category);
    Task<Category> UpdateAsync(Category c);
    Task DeleteAsync(int id);

    Task<CategoryTranslation> AddTranslationAsync(CategoryTranslation translation);
    Task UpdateTranslationAsync(CategoryTranslation translation);
    Task<CategoryTranslation?> GetTranslationAsync(int categoryId, string languageCode);
}