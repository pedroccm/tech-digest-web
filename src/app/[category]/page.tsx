"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useHeader } from "@/components/layout/header-context";
import { useCategoryIndex } from "@/hooks/use-digest-api";
import { DateCard } from "@/components/category/date-card";
import { CATEGORIES } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryKey } from "@/types/digest";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category as CategoryKey;
  const meta = CATEGORIES[category];
  const { setTitle, setShowBack } = useHeader();
  const { data, isLoading, error } = useCategoryIndex(category);

  useEffect(() => {
    setTitle(meta?.name ?? category);
    setShowBack(true);
  }, [setTitle, setShowBack, meta, category]);

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
        <p className="text-lg font-medium">Failed to load dates</p>
        <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    );
  }

  const dates = data?.dates ?? [];

  if (dates.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">No digests available yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {dates.map((date) => (
        <DateCard key={date} category={category} date={date} />
      ))}
    </div>
  );
}
