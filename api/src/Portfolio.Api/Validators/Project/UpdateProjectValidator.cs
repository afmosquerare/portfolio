using FluentValidation;
using Portfolio.Api.DTOs.Project;

public class UpdateProjectValidator : AbstractValidator<UpdateProjectRequest>
{
    public UpdateProjectValidator()
    {
        RuleFor(p => p.Order).GreaterThanOrEqualTo(0);
        RuleFor(p => p.ImageUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.ImageUrl is not null);
        RuleFor(p => p.DemoUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.DemoUrl is not null);
        RuleFor(p => p.GithubUrl).NotEmpty().Must( url => Uri.TryCreate(url, UriKind.Absolute, out _)).When( p => p.GithubUrl is not null);
    }
}