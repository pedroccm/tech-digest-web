"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "@/components/articles/article-card";
import { useFavorites } from "@/hooks/use-favorites";

export function FavoritesList() {
  const { favorites, isFavorited } = useFavorites();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return favorites;
    const q = query.toLowerCase();
    return favorites.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.newsletter.toLowerCase().includes(q)
    );
  }, [favorites, query]);

  // Sort by published_at descending
  const sorted = useMemo(
    () =>
      [...filtered].sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      ),
    [filtered]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search favorites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {sorted.length} {sorted.length === 1 ? "favorite" : "favorites"}
      </p>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/50 px-6 py-12 text-center">
          <p className="text-muted-foreground">
            {favorites.length === 0
              ? "No favorites yet. Tap the heart on any article to save it here."
              : "No favorites match your search."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((fav) => (
            <ArticleCard
              key={fav.url}
              article={fav}
              category={fav.category}
              date={fav.date}
              index={fav.index}
              isFavorited={isFavorited(fav.url)}
              showMeta
            />
          ))}
        </div>
      )}
    </div>
  );
}
