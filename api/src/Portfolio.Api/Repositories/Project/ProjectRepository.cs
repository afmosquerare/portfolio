using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Repositories.Projects;
public class ProjectRepository(PortfolioDbContext context) : IProjectRepository
{
    public async Task<Project> AddAsync(Project project)
    {
        await context.Projects.AddAsync(project);
        await context.SaveChangesAsync();
        return project;
    }


    public async Task DeleteAsync(int id)
    {
        await context.Projects.Where(p => p.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await context.Projects.ToListAsync();
    }
    public async Task<Project?> GetByIdAsync(int id)
    {
        var project = await context.Projects.FindAsync(id);
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        context.Projects.Update(project);
        await context.SaveChangesAsync();
        return project;
    }




}