using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ZurnaciApi.Helpers;

namespace ZurnaciApi.Handler
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly string _secureKey;

        public JwtMiddleware(RequestDelegate next, IServiceScopeFactory scopeFactory, IConfiguration configuration)
        {
            _next = next;
            _scopeFactory = scopeFactory;
            _secureKey = configuration["JwtSettings:SecureKey"];
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Cookies["jwt"];

            if (string.IsNullOrEmpty(token))
            {
                await _next(context);
                return;
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_secureKey);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // Optional: Token süresi hemen geçerli olsun
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Subject;

                // Kullanıcı bilgilerini context'e ekle
                context.Items["User"] = userId;
            }
            catch
            {
                // Token geçerli değilse, kullanıcı bilgisi eklenmez
            }

            await _next(context);
        }
    }
}
