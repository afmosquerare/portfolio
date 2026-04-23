using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Interfaces;

namespace Portfolio.Api.Repositories;

public class CategoryRepository(PortfolioDbContext context) : ICategoryRepository
{


    public async Task<Category> AddAsync(Category category)
    {
        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task DeleteAsync(int id)
    {
        await context.Categories.Where(c => c.Id == id).ExecuteDeleteAsync();
    }
    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await context.Categories.Include(c => c.CategoryTranslations).ToListAsync();
    }


    public async Task<Category?> GetByIdAsync(int id)
    {
        var category = await context.Categories
            .Include(c => c.CategoryTranslations)
            .FirstOrDefaultAsync(c => c.Id == id);
        return category;
    }

    public async Task<Category> UpdateAsync(Category c)
    {
        context.Categories.Update(c);
        await context.SaveChangesAsync();
        return c;
    }

    public async Task<CategoryTranslation> AddTranslationAsync(CategoryTranslation translation)
    {
        await context.CategoryTranslations.AddAsync(translation);
        await context.SaveChangesAsync();
        return translation;
    }

    public async Task UpdateTranslationAsync(CategoryTranslation translation)
    {
        context.CategoryTranslations.Update(translation);
        await context.SaveChangesAsync();
    }

    public async Task<CategoryTranslation?> GetTranslationAsync(int categoryId, string languageCode)
    {
        return await context.CategoryTranslations
            .FirstOrDefaultAsync(t => t.CategoryId == categoryId && t.LanguageCode == languageCode);
    }
}