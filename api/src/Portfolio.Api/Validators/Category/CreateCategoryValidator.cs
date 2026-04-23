using FluentValidation;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Validators.Category;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryValidator()
    {
        RuleFor(c => c.IconUrl)
        .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
        .When(c => c.IconUrl is not null);

        RuleForEach( c => c.CategoryTranslations).SetValidator( new CreateCategoryTranslationValidator());
    }
}