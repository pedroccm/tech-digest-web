"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useHeader } from "@/components/layout/header-context";
import { useDigestDay } from "@/hooks/use-digest-api";
import { useFavorites } from "@/hooks/use-favorites";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleFilter } from "@/components/articles/article-filter";
import { ArticleStats } from "@/components/articles/article-stats";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryKey, FilterType } from "@/types/digest";

export default function ArticlesPage() {
  const params = useParams<{ category: string; date: string }>();
  const category = params.category as CategoryKey;
  const date = params.date;
  const meta = CATEGORIES[category];
  const { setTitle, setShowBack } = useHeader();
  const { data, isLoading, error } = useDigestDay(category, date);
  const { isFavorited } = useFavorites();
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    setTitle(formatDate(date));
    setShowBack(true);
  }, [setTitle, setShowBack, date]);

  const articles = data?.articles ?? [];
  const freeCount = articles.filter((a) => !a.paid).length;
  const paidCount = articles.filter((a) => a.paid).length;

  const filtered = useMemo(() => {
    if (filter === "free") return articles.filter((a) => !a.paid);
    if (filter === "paid") return articles.filter((a) => a.paid);
    return articles;
  }, [articles, filter]);

  if (!meta) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Category not found</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium">Failed to load articles</p>
        <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-48" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">No articles for this date</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ArticleFilter
        current={filter}
        onChange={setFilter}
        counts={{ all: articles.length, free: freeCount, paid: paidCount }}
      />
      <ArticleStats showing={filtered.length} free={freeCount} paid={paidCount} />

      <div className="flex flex-col gap-3">
        {filtered.map((article, idx) => {
          const originalIndex = articles.indexOf(article);
          return (
            <ArticleCard
              key={article.url}
              article={article}
              category={category}
              date={date}
              index={originalIndex}
              isFavorited={isFavorited(article.url)}
            />
          );
        })}
      </div>
    </div>
  );
}
