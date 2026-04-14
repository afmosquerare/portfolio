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
        return await context.Categories.ToListAsync();
    }


    public async Task<Category?> GetByIdAsync(int id)
    {
        var category = await context.Categories.FindAsync(id);
        return category;
    }

    public async Task<Category> UpdateAsync(Category c)
    {
        context.Categories.Update( c );
        await context.SaveChangesAsync();
        return c;
    }
}