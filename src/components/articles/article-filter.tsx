"use client";

import { Button } from "@/components/ui/button";
import type { FilterType } from "@/types/digest";

interface ArticleFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  counts: { all: number; free: number; paid: number };
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "free", label: "FREE" },
  { key: "paid", label: "PAID" },
];

export function ArticleFilter({ current, onChange, counts }: ArticleFilterProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map(({ key, label }) => (
        <Button
          key={key}
          variant={current === key ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(key)}
          className="min-w-[70px]"
        >
          {label} ({counts[key]})
        </Button>
      ))}
    </div>
  );
}
