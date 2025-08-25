using System.ComponentModel.DataAnnotations;

namespace UpHealth.Web.Options;

public sealed class NewsOptions
{
    public NewsApiOptions NewsApi { get; init; } = new();
    public string CdcRssUrl { get; init; } = "";
}

public sealed class NewsApiOptions
{
    public string BaseUrl { get; init; } = "";
    public string ApiKey { get; init; } = "";
}

