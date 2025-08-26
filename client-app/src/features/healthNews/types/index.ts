export type Article = {
  source: string;
  title: string;
  summary?: string | null;
  url: string;
  imageUrl?: string | null;
  publishedAt: string; // ISO from server
  author?: string | null;
};