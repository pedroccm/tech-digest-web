"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryKey, CategoryMeta } from "@/types/digest";

interface CategoryCardProps {
  categoryKey: CategoryKey;
  meta: CategoryMeta;
  feedCount?: number;
  dateCount?: number;
}

export function CategoryCard({
  categoryKey,
  meta,
  feedCount,
  dateCount,
}: CategoryCardProps) {
  return (
    <Link href={`/${categoryKey}`}>
      <Card className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary">
        <CardContent className="flex flex-col items-center gap-3 p-6">
          <span className="text-4xl" style={{ filter: `drop-shadow(0 0 8px ${meta.color})` }}>
            {meta.icon}
          </span>
          <span className="text-lg font-semibold">{meta.name}</span>
          <span className="text-sm text-muted-foreground">
            {feedCount ?? meta.feeds} newsletters
          </span>
          {dateCount !== undefined && (
            <span className="text-xs text-muted-foreground">
              {dateCount} {dateCount === 1 ? "digest" : "digests"} available
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
