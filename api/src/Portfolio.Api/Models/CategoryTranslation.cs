namespace Portfolio.Api.Models;
public class CategoryTranslation
{
    public int CategoryId { get; set; }
    public Category Category {get; set; } = null!;

    public string LanguageCode {get; set;} = "es";
    public string Name { get; set; } = string.Empty;
}