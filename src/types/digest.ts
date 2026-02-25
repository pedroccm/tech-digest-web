// API Response Types

export interface DigestIndex {
  categories: Record<string, CategorySummary>;
  updated: string;
}

export interface CategorySummary {
  dates: string[];
  total: number;
}

export interface CategoryIndex {
  dates: string[];
  total: number;
}

export interface DailyDigest {
  category: string;
  date: string;
  total: number;
  paid_count: number;
  processed: number;
  errors: number;
  api_ok: number;
  api_err: number;
  articles: Article[];
}

export interface Article {
  title: string;
  newsletter: string;
  url: string;
  published_at: string;
  paid: boolean;
  content_html: string;
}

// Client-side types

export type CategoryKey = "tech" | "design" | "business" | "crypto";

export type FilterType = "all" | "free" | "paid";

export interface FavoriteArticle extends Article {
  category: CategoryKey;
  date: string;
  index: number;
}

export interface CategoryMeta {
  name: string;
  icon: string;
  feeds: number;
  color: string;
}
