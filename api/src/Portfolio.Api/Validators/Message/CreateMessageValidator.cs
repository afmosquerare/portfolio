using FluentValidation;
using Portfolio.Api.DTOs.Message;

namespace Portfolio.Api.Validators.Message;

public class CreateMessageValidator : AbstractValidator<CreateMessageRequest>
{
    public CreateMessageValidator()
    {
        RuleFor(m => m.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(100);

        RuleFor(m => m.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(m => m.Body)
            .NotEmpty()
            .MinimumLength(10)
            .MaximumLength(1000);
    }
}
