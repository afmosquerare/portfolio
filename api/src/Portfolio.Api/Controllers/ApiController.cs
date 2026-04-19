using System.Reflection.Metadata;
using ErrorOr;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class ApiController : ControllerBase
{
    protected IActionResult Problem(List<Error> errors)
    {
        var firstError = errors[0];
        var statusCode = firstError.Type switch
        {
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };
        return Problem(statusCode: statusCode, detail: firstError.Description);
    }

    protected IActionResult HandleResult<T>(ErrorOr<T> result)
    {
        return result.Match(
            value => Ok(value),
            errors => Problem(errors)
        );
    }

    protected IActionResult HandleDeletedResult<T>(ErrorOr<T> result)
    {
        return result.Match(
            value => NoContent(),
            errors => Problem(errors)
        );
    }

    protected IActionResult HandleAuthResult<T>(ErrorOr<T> result)
    {
        return result.Match<IActionResult>(
            token => Ok( new { token}),
            errors => Unauthorized()
        );
    }



}