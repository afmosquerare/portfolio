using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services.Auth;

public class JwtService
{

    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expirationInHours;

    public JwtService(IConfiguration config)
    {
        _secretKey = config["JwtSettings:Secret"]!;
        _issuer = config["JwtSettings:Issuer"]!;
        _audience = config["JwtSettings:Audience"]!;
        _expirationInHours = int.Parse( config["JwtSettings:ExpirationInHours"]! );
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey( Encoding.UTF8.GetBytes(_secretKey ));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(_expirationInHours),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }



}