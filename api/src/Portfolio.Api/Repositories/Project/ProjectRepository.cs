using ErrorOr;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        await context.ProjectTechnologies.AddAsync(projectTechnology);
        await context.SaveChangesAsync();
    }

    public async Task RemoveTechnologyAsync(int projectId, int technologyId)
    {
        await context.ProjectTechnologies
            .Where(pt => pt.ProjectId == projectId && pt.TechnologyId == technologyId)
            .ExecuteDeleteAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await context.Projects.Where(p => p.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<Project>> GetAllAsync(int? technologyId, string? lang, bool? isVisible)
    {

        var query = context.Projects
            .Include(p => p.ProjectTranslations)
            .Include(p => p.ProjectTechnologies)
            .ThenInclude(pt => pt.Technology)
            .AsQueryable();
        if (technologyId.HasValue)
        {
            query = query.Where(p => p.ProjectTechnologies.Any(pt => pt.TechnologyId == technologyId));
        }

        if (!lang.IsNullOrEmpty())
        {
            query = query.Where(p => p.ProjectTranslations.Any(pt => pt.LanguageCode == lang));
        }
        if (isVisible.HasValue)
        {
            query = query.Where(p => p.IsVisible == isVisible);
        }
        return await query
            .OrderByDescending(p => p.Order)
            .ToListAsync();
        
    }
    public async Task<Project?> GetByIdAsync(int id)
    {
        var project = await context.Projects
            .Include(p => p.ProjectTranslations)
            .Include(p => p.ProjectTechnologies)
            .ThenInclude(pt => pt.Technology)
            .FirstOrDefaultAsync(p => p.Id == id);
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        context.Projects.Update(project);
        await context.SaveChangesAsync();
        return project;
    }

    public async Task UpdateTranslationAsync(ProjectTranslation translation)
    {
        context.ProjectTranslations.Update( translation );
        await context.SaveChangesAsync();
    }
    public async Task<ProjectTranslation> AddTranslationAsync(ProjectTranslation translation)
    {
        await context.ProjectTranslations.AddAsync(translation);
        await context.SaveChangesAsync();
        return translation;
    }

    public async Task<ProjectTranslation?> GetTranslationAsync(int projectId, string lang)
    {
        return await context.ProjectTranslations
            .FirstOrDefaultAsync( p => p.ProjectId == projectId  && p.LanguageCode == lang);
    }
}