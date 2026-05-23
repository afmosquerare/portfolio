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
    }
}
