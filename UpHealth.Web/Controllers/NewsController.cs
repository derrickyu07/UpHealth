using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UpHealth.Web.DTOs;
using UpHealth.Web.Options;
using UpHealth.Web.Services.News;

namespace UpHealth.Web.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public sealed class NewsController : ControllerBase
    {
        private readonly INewsService _svc;
        public NewsController(INewsService svc) => _svc = svc;

        [HttpGet("top")]
        public async Task<ActionResult<IReadOnlyList<ArticleDto>>> GetTop(CancellationToken ct)
            => Ok(await _svc.GetTopHealthNewsAsync(ct));

        [HttpGet("official")]
        public async Task<ActionResult<IReadOnlyList<ArticleDto>>> GetOfficial(CancellationToken ct)
            => Ok(await _svc.GetOfficialHealthUpdatesAsync(ct));

        [HttpGet("combined")]
        public async Task<ActionResult<IReadOnlyList<ArticleDto>>> GetCombined([FromQuery] int limit = 25, CancellationToken ct = default)
            => Ok(await _svc.GetCombinedAsync(Math.Clamp(limit, 1, 50), ct));

    }

}