using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UpHealth.Web.DTOs;

public sealed record ArticleDto
(
    string Source,
    string Title,
    string? Summary,
    string Url,
    string? ImageUrl,
    DateTimeOffset PublishedAt,
    string? Author
);