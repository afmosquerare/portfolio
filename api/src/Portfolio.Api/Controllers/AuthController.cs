using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Portfolio.Api.DTOs.Auth;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService service) : ApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Login(LoginRequest req)
        => HandleAuthResult( await service.LoginAsync(req.Username, req.Password));
}