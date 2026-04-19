using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

public class UserRepository(PortfolioDbContext context) : IUserRepository
{
    public async Task<User?> GetByUsernameAsync(string username )
    {
        return await context.Users.FirstOrDefaultAsync( user => user.Username == username);
    }

    public async Task<User> AddAsync(User user)
    {
        await context.AddAsync( user );
        await context.SaveChangesAsync();
        return user;
    }
}