using FluentValidation;
using Portfolio.Api.Models;

namespace Portfolio.Api.Validators.Project;
public class UpdateProjectTranslationValidator : AbstractValidator<UpdateProjectTranslationRequest>
{
    public UpdateProjectTranslationValidator()
    {
        RuleFor(t => t.Title).MinimumLength(5).When(t => t.Title is not null);
        RuleFor(t => t.Description).MinimumLength(20).When(t => t.Description is not null);
    }
}