using ErrorOr;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;
using Portfolio.Api.Repositories.Technologies;

namespace Portfolio.Api.Repositories.Projects;

public class ProjectRepository(PortfolioDbContext context) : IProjectRepository
{
    public async Task<Project> AddAsync(Project project)
    {
        await context.Projects.AddAsync(project);
        await context.SaveChangesAsync();
        return project;
    }

    public async Task AddTechnologyAsync(ProjectTechnology projectTechnology)
    {
        await context.ProjectTechnologies.AddAsync( projectTechnology );
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await context.Projects.Where(p => p.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<Project>> GetAllAsync(int? technologyId)
    {

        var query = context.Projects.Include(p => p.ProjectTechnologies).ThenInclude(pt => pt.Technology)
        .AsQueryable();
        if (technologyId.HasValue)
        {
            query = query.Where( p => p.ProjectTechnologies.Any( pt => pt.TechnologyId == technologyId ));
        }
        return await query.Where( p => p.IsVisible).OrderByDescending(p => p.Order).ToListAsync();
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