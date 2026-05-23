using Mapster;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddFluentValidation();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddOutputCache();
builder.Services.AddDbContext<PortfolioDbContext>(options =>
{
   options.UseSqlServer( builder.Configuration["ConnectionStrings:Default"]  ); 
});

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            if (allowedOrigins.Length > 0)
            {
                policy.WithOrigins(allowedOrigins)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            }
        });
});

builder.Services.AddControllers();

MappingConfig.Configure();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseOutputCache();
app.UseAuthentication(); 
app.UseAuthorization();  
app.MapControllers();


using ( var scope = app.Services.CreateScope())
{
    var repositoy = scope.ServiceProvider.GetRequiredService<IUserRepository>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    await DbSeeder.SeedAsync(repositoy, config);
    
}
app.Run();

