"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useHeader } from "@/components/layout/header-context";
import { useDigestDay } from "@/hooks/use-digest-api";
import { ArticleReader } from "@/components/articles/article-reader";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryKey } from "@/types/digest";

export default function ArticlePage() {
  const params = useParams<{ category: string; date: string; index: string }>();
  const category = params.category as CategoryKey;
  const date = params.date;
  const index = parseInt(params.index, 10);
  const { setTitle, setShowBack } = useHeader();
  const { data, isLoading, error } = useDigestDay(category, date);

  const article = data?.articles?.[index];

  useEffect(() => {
    setTitle(article?.title ?? "Loading...");
    setShowBack(true);
  }, [setTitle, setShowBack, article]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium">Failed to load article</p>
        <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Article not found</p>
      </div>
    );
  }

  return (
    <ArticleReader
      article={article}
      category={category}
      date={date}
      index={index}
    />
  );
}
