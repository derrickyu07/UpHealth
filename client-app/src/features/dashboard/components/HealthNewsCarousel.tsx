// src/features/healthNews/components/HealthNewsCarousel.tsx
import React, { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { loadNews } from '../../healthNews/stores/newsSlice';
import type { Article } from '../../healthNews/types';

function popularityScore(a: Article) {
  const ageHours = Math.max(
    1,
    (Date.now() - new Date(a.publishedAt).getTime()) / 36e5
  );
  const recency = 1 / ageHours; // fresher = higher
  const hasImage = a.imageUrl ? 0.3 : 0; // image gets a nudge
  const official = a.source === 'CDC' ? 0.2 : 0; // small trust bump
  return recency + hasImage + official;
}

export default function HealthNewsCarousel({
  maxItems = 8,
}: {
  maxItems?: number;
}) {
  const dispatch = useAppDispatch();
  const { items: raw, status, error } = useAppSelector((s) => s.news);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // pull enough items to rank from; backend still caches + trims
    if (status === 'idle') dispatch(loadNews(40));
  }, [dispatch, status]);

  const items = useMemo(() => {
    const sorted = [...raw].sort(
      (a, b) => popularityScore(b) - popularityScore(a)
    );
    return sorted.slice(0, maxItems);
  }, [raw, maxItems]);

  const step = () => scroller.current?.clientWidth ?? 800;
  const scrollLeft = () =>
    scroller.current?.scrollBy({ left: -step(), behavior: 'smooth' });
  const scrollRight = () =>
    scroller.current?.scrollBy({ left: step(), behavior: 'smooth' });

  if (status === 'loading')
    return <div className="p-4 animate-pulse">Loading news…</div>;
  if (status === 'failed')
    return <div className="p-4 text-red-600">Couldn’t load news: {error}</div>;
  if (!items.length)
    return <div className="p-4 text-gray-500">No news yet.</div>;

  return (
    <div className="relative">
      {/* Left button */}
      <div className="bg-red-500 text-white p-10">Tailwind Test</div>
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow hover:bg-white">
        ◀
      </button>

      {/* Edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />

      {/* Carousel */}
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-12 pb-2"
        style={{ scrollbarWidth: 'thin' }}>
        {items.map((a) => (
          <article
            key={a.url}
            className="snap-start shrink-0 w-56 rounded-2xl bg-white shadow hover:shadow-md transition p-4">
            {a.imageUrl && (
              <div className="w-16 h-24 rounded-xl overflow-hidden mb-3">
                <img
                  src={a.imageUrl}
                  alt=""
                  className="!w-full !h-full block object-cover"
                  loading="lazy"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.display =
                      'none')
                  }
                />
              </div>
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

      {/* Right button */}
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow hover:bg-white">
        ▶
      </button>
    </div>
  );
}

function stripHtml(s?: string | null) {
  if (!s) return '';
  const div = document.createElement('div');
  div.innerHTML = s;
  return div.textContent || div.innerText || '';
}
