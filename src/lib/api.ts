import { API_BASE } from "./constants";
import type { DigestIndex, CategoryIndex, DailyDigest } from "@/types/digest";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

export function getRootIndex(): Promise<DigestIndex> {
  return fetchJSON<DigestIndex>(`${API_BASE}/index.json`);
}

export function getCategoryIndex(category: string): Promise<CategoryIndex> {
  return fetchJSON<CategoryIndex>(`${API_BASE}/${category}/index.json`);
}

export function getDigestDay(
  category: string,
  date: string
): Promise<DailyDigest> {
  return fetchJSON<DailyDigest>(`${API_BASE}/${category}/${date}.json`);
}
