using FluentValidation;
using Portfolio.Api.DTOs.Project;

public class UpdateProjectValidator : AbstractValidator<UpdateProjectRequest>
{
    public UpdateProjectValidator()
    {
        RuleFor(p => p.Title).NotEmpty().MinimumLength(5).When(p => p.Title is not null);
        RuleFor(p => p.Description).NotEmpty().MinimumLength(100).When(p => p.Description is not null);
        RuleFor(p => p.ImageUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.ImageUrl is not null);
        RuleFor(p => p.DemoUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.DemoUrl is not null);
        RuleFor(p => p.GithubUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.GithubUrl is not null);
    }
}