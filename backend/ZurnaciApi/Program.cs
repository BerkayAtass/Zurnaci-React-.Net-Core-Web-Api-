using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using ZurnaciApi.Data;
using ZurnaciApi.Helpers;
using ZurnaciApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ZurnaciApi.Handler;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

// JWT servisinin DI konteynerine eklenmesi
builder.Services.AddScoped<JwtService>();

// Veritabanı bağlantısı
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

// Authorization ayarları (AdminOnly policy)
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireClaim("isAdmin", "True"));
});

// JWT Authentication için gerekli yapılandırmalar
string secureKey = builder.Configuration["JwtSettings:SecureKey"];
if (string.IsNullOrEmpty(secureKey))
{
    throw new InvalidOperationException("SecureKey is not configured in appsettings.json.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});
// Diğer servisler
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();


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
app.UseMiddleware<JwtMiddleware>(); 

app.UseAuthentication();
app.UseAuthorization();  

app.MapControllers();

app.Run();
