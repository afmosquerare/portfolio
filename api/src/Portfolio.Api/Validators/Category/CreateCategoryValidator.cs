using FluentValidation;
using Portfolio.Api.DTOs.Category;
using Portfolio.Api.Validators.Category;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryValidator()
    {
        RuleForEach( c => c.CategoryTranslations).SetValidator( new CreateCategoryTranslationValidator());
    }
}