using ErrorOr;

public interface IAuthService
{
    Task<ErrorOr<string>> LoginAsync(string username, string password );
    
}