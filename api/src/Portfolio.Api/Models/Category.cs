namespace Portfolio.Api.Models;
public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public ICollection<Technology> Technologies { get; set; } = [];
}