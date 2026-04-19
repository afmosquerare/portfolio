using Portfolio.Api.Models;

public static class DbSeeder
{

    public static async Task SeedAsync(IUserRepository repository, IConfiguration config)
    {

        var username = config["DefaultCredentials:Username"] ??
                throw new InvalidOperationException("DefaultCredentials: Username no configurado");

        var password = config["DefaultCredentials:Password"] ??
            throw new InvalidOperationException("DefaultCredentials: Password no configurado");

        var user = await repository.GetByUsernameAsync(username);

        if (user is null)
        {
            await repository.AddAsync(new User
            {
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
            });
        }


    }

}