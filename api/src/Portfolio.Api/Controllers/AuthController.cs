using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs.Auth;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService service) : ApiController
{
    [HttpPost]
    public async Task<IActionResult> Login(LoginRequest req)
        => HandleAuthResult( await service.LoginAsync(req.Username, req.Password));
}