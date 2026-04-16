using FluentValidation;
using Portfolio.Api.DTOs.Technology;

namespace Portfolio.Api.Validators.Technology;

public class UpdateTechnologyValidator : AbstractValidator<UpdateTechnologyRequest>
{
    public UpdateTechnologyValidator()
    {
        RuleFor(t => t.Name)
            .MinimumLength(2)
            .MaximumLength(100)
            .When(t => t.Name is not null);

        RuleFor(t => t.IconUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(t => t.IconUrl is not null);

        RuleFor(t => t.CategoryId)
            .GreaterThan(0)
            .When(t => t.CategoryId.HasValue);
    }
}
