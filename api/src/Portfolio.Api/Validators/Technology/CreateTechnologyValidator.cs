using FluentValidation;
using Portfolio.Api.DTOs.Technology;

namespace Portfolio.Api.Validators.Technology;

public class CreateTechnologyValidator : AbstractValidator<CreateTechnologyRequest>
{
    public CreateTechnologyValidator()
    {
        RuleFor(t => t.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(100);

        RuleFor(t => t.IconUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(t => t.IconUrl is not null);

        RuleFor(t => t.CategoryId)
            .GreaterThan(0);
    }
}
