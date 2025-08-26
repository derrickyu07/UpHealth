import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { loadNews } from '../../healthNews/stores/newsSlice';

const PAGE_SIZE = 6;

export default function HealthNews() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.news);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // fetch more than one page worth so next/prev has something to show
    dispatch(loadNews(30));
  }, [dispatch]);

  // Keep page in range if items change
  const totalPages = Math.max(1, Math.ceil((items?.length || 0) / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1);
  }, [page, totalPages]);

  const currentSlice = useMemo(() => {
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => Math.min(totalPages - 1, p + 1)),
    [totalPages]
  );

  if (status === 'loading')
    return <div className="animate-pulse p-4">Loading health news…</div>;
  if (status === 'failed')
    return <div className="text-red-600 p-4">Couldn’t load news: {error}</div>;
  if (!items?.length)
    return <div className="p-4 text-gray-500">No news available.</div>;

  return (
    <section
      className="relative"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }}
      tabIndex={0} // allow keyboard focus for arrow keys
      aria-label="Health news carousel">
      {/* Header + controls */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Health News</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 select-none">
            Page {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
            aria-label="Previous page">
            ‹ Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
            aria-label="Next page">
            Next ›
          </button>
        </div>
      </div>

      {/* Grid of 6 per page */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {currentSlice.map((a) => (
          <article key={a.url} className="rounded-2xl shadow p-4 bg-white">
            {a.imageUrl && (
              <img
                src={a.imageUrl}
                alt=""
                className="w-full h-40 object-cover rounded-xl mb-3"
                loading="lazy"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.display = 'none')
                }
              />
            )}
            <div className="text-xs uppercase tracking-wide text-gray-500">
              {a.source}
            </div>
            <a
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="block font-semibold mt-1 hover:underline line-clamp-3"
              title={a.title}>
              {a.title}
            </a>
            {a.summary && (
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {stripHtml(a.summary)}
              </p>
            )}
            <div className="text-xs text-gray-500 mt-3">
              {new Date(a.publishedAt).toLocaleString()}{' '}
              {a.author ? `· ${a.author}` : ''}
            </div>
          </article>
        ))}
      </div>

      {/* Dots (optional) */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2 w-2 rounded-full ${
              i === page ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function stripHtml(s?: string | null) {
  if (!s) return '';
  const div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || div.innerText || '';
}
