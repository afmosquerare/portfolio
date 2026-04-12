using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions options) : base(options) { }
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Technology> Technologies => Set<Technology>();
    public DbSet<ProjectTechnology> ProjectTechnologies => Set<ProjectTechnology>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder md)
    {
        md.Entity<ProjectTechnology>()
            .HasKey(pt => new { pt.TechnologyId, pt.ProjectId });
    }

    public override async Task<int> SaveChangesAsync(CancellationToken ct= default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if(entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }
            if(entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
        return await base.SaveChangesAsync(ct);
    }


}