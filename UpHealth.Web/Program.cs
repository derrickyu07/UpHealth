using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using UpHealth.Web.Options;
using UpHealth.Web.Services.News;
using UpHealth.Web.Services.Vaccines;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient("newsapi", (sp, c) =>
{
    var opts = sp.GetRequiredService<IOptions<NewsOptions>>().Value;
    var baseUrl = (opts.NewsApi.BaseUrl ?? "").Trim();

    if (!Uri.TryCreate(baseUrl, UriKind.Absolute, out var baseUri))
        throw new InvalidOperationException($"Invalid News:NewsApi:BaseUrl '{baseUrl}'");

    c.BaseAddress = baseUri;
    c.DefaultRequestHeaders.Add("X-Api-Key", (opts.NewsApi.ApiKey ?? "").Trim());
});

builder.Services.AddMemoryCache();

builder.Services.AddOptions<NewsOptions>()
    .Bind(builder.Configuration.GetSection("News"))
    .Validate(o => !string.IsNullOrWhiteSpace(o.NewsApi.BaseUrl), "News:NewsApi:BaseUrl is required.")
    .Validate(o => !string.IsNullOrWhiteSpace(o.NewsApi.ApiKey), "News:NewsApi:ApiKey is required.")
    .Validate(o => !string.IsNullOrWhiteSpace(o.CdcRssUrl), "News:CdcRssUrl is required.")
    .ValidateOnStart();
// Add DbContext for SQL Server
builder.Services.AddDbContext<HealthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS to allow requests from specific origins
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Identity services (Authentication and Authorization)
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<HealthDbContext>()
    .AddDefaultTokenProviders();

// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "default-secret-key"))
    };
});


builder.Services.AddHttpClient("newsapi", (sp, c) =>
{
    var opts = sp.GetRequiredService<IOptions<NewsOptions>>().Value;

    c.BaseAddress = new Uri(opts.NewsApi.BaseUrl.TrimEnd('/'));
    c.DefaultRequestHeaders.Remove("X-Api-Key");
    c.DefaultRequestHeaders.Add("X-Api-Key", (opts.NewsApi.ApiKey ?? "").Trim());

    // ---- Add a proper User-Agent ----
    c.DefaultRequestHeaders.UserAgent.Clear();
    c.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("UpHealth", "1.0"));
    // Optional “comment” part (must be in parentheses)
    c.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("(+https://github.com/derrickyu07; contact=derrick909090@gmail.com)"));

    // Optional but tidy:
    c.DefaultRequestHeaders.Accept.ParseAdd("application/json");
});

builder.Services.AddHttpClient("cdc", c =>
{
    c.DefaultRequestHeaders.UserAgent.ParseAdd("UpHealth/1.0 (+https://github.com/derrickyu07/; contact=derrick909090@gmail.com)");
    c.DefaultRequestHeaders.Accept.ParseAdd("application/rss+xml, application/xml;q=0.9, */*;q=0.8");
});

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "UpHealth API", Version = "v1" });

    // Add JWT Authorization support in Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: `Bearer {token}`",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    // Set the Security Requirement for Swagger
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddSingleton<VaccineService>();
var app = builder.Build();

// Configure middleware in the HTTP request pipeline
app.UseHttpsRedirection();  // Ensure HTTPS is used for the application
app.UseCors();  // Enable CORS
app.UseAuthentication();  // Ensure authentication is handled before authorization
app.UseAuthorization();  // Enable authorization middleware

// Enable Swagger UI only in Development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "UpHealth API v1");
        options.RoutePrefix = string.Empty;  // Swagger UI will be available at the root URL (localhost:5190)
    });
}

// Map API controllers to routes
app.MapControllers();

// Serve static files (for SPA fallback like React or Angular)
app.UseStaticFiles();
app.MapFallbackToFile("index.html");  // Fallback to index.html for SPA routing

app.Run();

