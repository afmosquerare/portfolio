using FluentValidation;
using Portfolio.Api.DTOs.Project;

public class CreateProjectValidator : AbstractValidator<CreateProjectRequest>
{
    public CreateProjectValidator()
    {
        RuleFor(p => p.Title).NotEmpty().MinimumLength(5);
        RuleFor(p => p.Description).NotEmpty().MinimumLength(100);
        RuleFor(p => p.ImageUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( url => url is not null);
        RuleFor(p => p.DemoUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( url => url is not null);
        RuleFor(p => p.GithubUrl).Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( url => url is not null);
    }
}