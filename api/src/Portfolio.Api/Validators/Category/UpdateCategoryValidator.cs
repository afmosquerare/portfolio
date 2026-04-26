using FluentValidation;
using Portfolio.Api.DTOs.Category;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryRequest>
{
    public UpdateCategoryValidator()
    {
        RuleFor(c => c.Icon)
        .NotEmpty()
        .When(c => c.Icon is not null);
    }
}