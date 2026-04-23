using FluentValidation;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Models;

namespace Portfolio.Api.Validators.Category;

public class UpdateCategoryTranslationValidator : AbstractValidator<UpdateCategoryTranslationRequest>
{

    private readonly ICollection<string> _languageCodes = ["en", "es"];
    public UpdateCategoryTranslationValidator()
    {
        RuleFor(t => t.Name).NotEmpty();
    }
}