using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using ZurnaciApi.Data;
using ZurnaciApi.Helpers;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddScoped<JwtService>();

// Connection string'i al
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// DbContext'i servis olarak ekle
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
{
    policy
        .WithOrigins("http://localhost:5173") 
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Foods")),
    RequestPath = "/uploads/foods"  
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();