using FluentValidation;
using Portfolio.Api.Models;

namespace Portfolio.Api.Validators.Project;
public class CreateProjectTranslationValidator : AbstractValidator<CreateProjectTranslationRequest>
{

    private readonly ICollection<string> _languageCodes = ["en", "es"];
    public CreateProjectTranslationValidator()
    {
        RuleFor(t => t.LanguageCode).Must(_languageCodes.Contains).WithMessage("El codigo del idioma debe ser 'en' o 'es'");
        RuleFor(t => t.Title).MinimumLength(5);
        RuleFor(t => t.Description).MinimumLength(20);
    }
}