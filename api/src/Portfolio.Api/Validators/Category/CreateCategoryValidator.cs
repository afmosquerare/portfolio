using FluentValidation;
using Portfolio.Api.DTOs.Category;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryValidator()
    {
        RuleFor(c => c.Name).NotEmpty();
        RuleFor(c => c.IconUrl)
        .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
        .When(url => url is not null);
    }
}