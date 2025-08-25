using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UpHealth.Web.DTOs;

namespace UpHealth.Web.Services.News
{
    public interface INewsService
    {
        Task<IReadOnlyList<ArticleDto>> GetTopHealthNewsAsync(CancellationToken ct);
        Task<IReadOnlyList<ArticleDto>> GetOfficialHealthUpdatesAsync(CancellationToken ct);
        Task<IReadOnlyList<ArticleDto>> GetCombinedAsync(int limit, CancellationToken ct);
    }
}