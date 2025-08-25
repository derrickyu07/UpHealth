using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.ServiceModel.Syndication;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Text.Json;
using UpHealth.Web.Models;
using UpHealth.Web.DTOs;
using UpHealth.Web.Options;
namespace UpHealth.Web.Services.News
{

    public sealed class NewsService : INewsService
    {
        private readonly IHttpClientFactory _http;
        private readonly IMemoryCache _cache;
        private readonly NewsOptions _opts;

        private static readonly JsonSerializerOptions _jsonOpts = new(JsonSerializerDefaults.Web);

        public NewsService(IHttpClientFactory http, IMemoryCache cache, IOptions<NewsOptions> opts)
        {
            _http = http;
            _cache = cache;
            _opts = opts.Value;
        }

        public async Task<IReadOnlyList<ArticleDto>> GetTopHealthNewsAsync(CancellationToken ct)
        {
            return await _cache.GetOrCreateAsync("newsapi:health", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15); // throttle costs

                var client = _http.CreateClient("newsapi");
                var url = $"{_opts.NewsApi.BaseUrl}/top-headlines?category=health&country=us&pageSize=25";

                using var resp = await client.GetAsync(url, ct);
                // resp.EnsureSuccessStatusCode();
                var text = await resp.Content.ReadAsStringAsync(ct);
                if (!resp.IsSuccessStatusCode)
                {
                    // NewsAPI returns a helpful JSON error (e.g., apiKeyInvalid)
                    throw new HttpRequestException($"NewsAPI {resp.StatusCode}: {text}");
                }
                using var stream = await resp.Content.ReadAsStreamAsync(ct);
                var payload = await JsonSerializer.DeserializeAsync<NewsApiResponse>(stream, _jsonOpts, ct);

                var items = payload?.articles?.Select(a => new ArticleDto(
                    Source: "NewsAPI",
                    Title: a.title ?? "",
                    Summary: a.description,
                    Url: a.url ?? "",
                    ImageUrl: a.urlToImage,
                    PublishedAt: a.publishedAt ?? DateTimeOffset.UtcNow,
                    Author: a.author
                ))
                .Where(a => !string.IsNullOrWhiteSpace(a.Title) && !string.IsNullOrWhiteSpace(a.Url))
                .ToList() ?? new List<ArticleDto>();

                return items;
            }) ?? new List<ArticleDto>();
        }

        public async Task<IReadOnlyList<ArticleDto>> GetOfficialHealthUpdatesAsync(CancellationToken ct)
        {
            return await _cache.GetOrCreateAsync("cdc:rss", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);

                var http = _http.CreateClient();
                using var stream = await http.GetStreamAsync(_opts.CdcRssUrl, ct);

                using var reader = XmlReader.Create(stream, new XmlReaderSettings { Async = true });

                var feed = SyndicationFeed.Load(reader);

                var list = feed?.Items?.Select(i => new ArticleDto(
                    Source: "CDC",
                    Title: i.Title?.Text ?? "",
                    Summary: i.Summary?.Text,
                    Url: i.Links.FirstOrDefault()?.Uri.ToString() ?? "",
                    ImageUrl: i.Links.FirstOrDefault(l => l.RelationshipType == "enclosure")?.Uri.ToString(),
                    PublishedAt: i.PublishDate != DateTimeOffset.MinValue ? i.PublishDate : DateTimeOffset.UtcNow,
                    Author: i.Authors.FirstOrDefault()?.Name
                ))
                .Where(a => !string.IsNullOrWhiteSpace(a.Title) && !string.IsNullOrWhiteSpace(a.Url))
                .Take(30)
                .ToList() ?? new List<ArticleDto>();

                return list;
            }) ?? new List<ArticleDto>();
        }

        public async Task<IReadOnlyList<ArticleDto>> GetCombinedAsync(int limit, CancellationToken ct)
        {
            var (general, official) = await TaskExtensions.WhenAll(
                GetTopHealthNewsAsync(ct),
                GetOfficialHealthUpdatesAsync(ct)
            );

            // De-dup by URL and sort by publish time desc
            var combined = general.Concat(official)
                .GroupBy(a => a.Url, StringComparer.OrdinalIgnoreCase)
                .Select(g => g.First())
                .OrderByDescending(a => a.PublishedAt)
                .Take(limit)
                .ToList();

            return combined;
        }

        // Minimal NewsAPI response shape
        private sealed class NewsApiResponse
        {
            public string? status { get; set; }
            public int? totalResults { get; set; }
            public List<Article>? articles { get; set; }
            public sealed class Article
            {
                public SourceObj? source { get; set; }
                public string? author { get; set; }
                public string? title { get; set; }
                public string? description { get; set; }
                public string? url { get; set; }
                public string? urlToImage { get; set; }
                public DateTimeOffset? publishedAt { get; set; }
            }
            public sealed class SourceObj { public string? name { get; set; } }
        }
    }

    file static class TaskExtensions
    {
        public static async Task<(T1, T2)> WhenAll<T1, T2>(Task<T1> t1, Task<T2> t2)
        {
            await Task.WhenAll(t1, t2);
            return (t1.Result, t2.Result);
        }
    }

}