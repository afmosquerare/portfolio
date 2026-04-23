using FluentValidation;
using Portfolio.Api.DTOs.Project;
using Portfolio.Api.DTOs.Technology;
using Portfolio.Api.Validators.Technology;

namespace Portfolio.Api.Validators.Project;
public class CreateProjectValidator : AbstractValidator<CreateProjectRequest>
{

    private readonly ICollection<string> _languageCodes = ["en", "es"];
    public CreateProjectValidator()
    {
        RuleFor(p => p.Order).GreaterThanOrEqualTo(0);
        RuleFor(p => p.ImageUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.ImageUrl is not null);
        RuleFor(p => p.DemoUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.DemoUrl is not null);
        RuleFor(p => p.GithubUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.GithubUrl is not null);
        RuleFor(p => p.ProjectTranslations).NotEmpty();

        RuleForEach( p => p.ProjectTranslations).SetValidator( new CreateProjectTranslationValidator() );

    }
}
