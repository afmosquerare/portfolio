using FluentValidation;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Models;

namespace Portfolio.Api.Validators.Category;
public class CreateCategoryTranslationValidator : AbstractValidator<CreateCategoryTranslationRequest>
{

    private readonly ICollection<string> _languageCodes = ["en", "es"];
    public CreateCategoryTranslationValidator()
    {
        RuleFor(t => t.LanguageCode).Must(_languageCodes.Contains).WithMessage("El codigo del idioma debe ser 'en' o 'es'");
        RuleFor(t => t.Name).NotEmpty();
    }
}