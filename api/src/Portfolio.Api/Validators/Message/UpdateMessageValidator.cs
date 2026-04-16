using FluentValidation;
using Portfolio.Api.DTOs.Message;

namespace Portfolio.Api.Validators.Message;

public class UpdateMessageValidator : AbstractValidator<UpdateMessageRequest>
{
    public UpdateMessageValidator()
    {
    }
}
