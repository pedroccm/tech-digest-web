"use client";

import useSWR from "swr";
import { getRootIndex, getCategoryIndex, getDigestDay } from "@/lib/api";
import type { DigestIndex, CategoryIndex, DailyDigest } from "@/types/digest";

export function useRootIndex() {
  return useSWR<DigestIndex>("root-index", getRootIndex, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}

export function useCategoryIndex(category: string) {
  return useSWR<CategoryIndex>(
    category ? `category-${category}` : null,
    () => getCategoryIndex(category),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );
}

export function useDigestDay(category: string, date: string) {
  return useSWR<DailyDigest>(
    category && date ? `digest-${category}-${date}` : null,
    () => getDigestDay(category, date),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );
}
