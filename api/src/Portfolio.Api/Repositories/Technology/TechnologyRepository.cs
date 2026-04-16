using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;
using System.Linq;

namespace Portfolio.Api.Repositories.Technologies;

public class TechnologyRepository(PortfolioDbContext context) : ITechnologyRepository
{
    public async Task<Technology> AddAsync(Technology technology)
    {
        await context.Technologies.AddAsync(technology);
        await context.SaveChangesAsync();
        return technology;
    }

    public async Task DeleteAsync(int id)
    {
        await context.Technologies.Where(t => t.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<Technology>> GetAllAsync()
    {
        return await context.Technologies
            .Include(t => t.Category)
            .OrderBy(t => t.Name)
            .ToListAsync();
    }

    public async Task<IEnumerable<Technology>> GetByCategoryAsync(int categoryId)
    {
        return await context.Technologies
            .Where(t => t.CategoryId == categoryId)
            .OrderBy(t => t.Name)
            .ToListAsync();
    }

    public async Task<Technology?> GetByIdAsync(int id)
    {
        return await context.Technologies
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Technology> UpdateAsync(Technology technology)
    {
        context.Technologies.Update(technology);
        await context.SaveChangesAsync();
        return technology;
    }
}
