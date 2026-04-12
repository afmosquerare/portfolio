using Mapster;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddFluentValidation();
builder.Services.AddDbContext<PortfolioDbContext>(options =>
{
   options.UseSqlServer( builder.Configuration["ConnectionStrings:Default"]  ); 
});

builder.Services.AddControllers();


TypeAdapterConfig.GlobalSettings.Default.IgnoreNullValues(true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

