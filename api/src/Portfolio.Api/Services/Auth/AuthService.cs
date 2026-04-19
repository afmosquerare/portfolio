using ErrorOr;
using Portfolio.Api.Services.Auth;

public class AuthService(IUserRepository userRepository, JwtService jwtService) : IAuthService
{
    public async Task<ErrorOr<string>> LoginAsync(string username, string password)
    {
        var user = await userRepository.GetByUsernameAsync( username);
        if( user is null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return Error.Unauthorized("User.Unauthorized", "Credenciales invalidas");
        }
        return jwtService.GenerateToken(user);
    }
}