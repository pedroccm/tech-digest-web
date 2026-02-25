"use client";

import { useEffect } from "react";
import { useHeader } from "@/components/layout/header-context";
import { useRootIndex } from "@/hooks/use-digest-api";
import { CategoryCard } from "@/components/home/category-card";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { setTitle, setShowBack } = useHeader();
  const { data, isLoading, error } = useRootIndex();

  useEffect(() => {
    setTitle("Digest Hub");
    setShowBack(false);
  }, [setTitle, setShowBack]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium">Failed to load digest</p>
        <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {CATEGORY_KEYS.map((key) => {
        const catData = data?.categories?.[key];
        return (
          <CategoryCard
            key={key}
            categoryKey={key}
            meta={CATEGORIES[key]}
            dateCount={catData?.total}
          />
        );
      })}
    </div>
  );
}
