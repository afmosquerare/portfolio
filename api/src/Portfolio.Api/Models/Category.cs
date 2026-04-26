namespace Portfolio.Api.Models;
public class Category : BaseEntity
{
    public string? Icon {get; set;} = string.Empty;
    public ICollection<Technology> Technologies { get; set; } = [];
    public ICollection<CategoryTranslation> CategoryTranslations { get; set; } = [];
}