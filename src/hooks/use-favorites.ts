"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { FavoriteArticle } from "@/types/digest";

const STORAGE_KEY = "digest-favorites";

let listeners: (() => void)[] = [];
let cachedSnapshot: FavoriteArticle[] = [];
const EMPTY: FavoriteArticle[] = [];

// Initialize cache from localStorage on module load (client only)
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cachedSnapshot = raw ? JSON.parse(raw) : [];
  } catch {
    cachedSnapshot = [];
  }
}

function emitChange() {
  // Update cached snapshot before notifying
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cachedSnapshot = raw ? JSON.parse(raw) : [];
  } catch {
    cachedSnapshot = [];
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): FavoriteArticle[] {
  return cachedSnapshot;
}

function getServerSnapshot(): FavoriteArticle[] {
  return EMPTY;
}

function saveFavorites(favs: FavoriteArticle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  emitChange();
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isFavorited = useCallback(
    (url: string) => favorites.some((f) => f.url === url),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (article: FavoriteArticle) => {
      const current = getSnapshot();
      const exists = current.some((f) => f.url === article.url);
      if (exists) {
        saveFavorites(current.filter((f) => f.url !== article.url));
      } else {
        saveFavorites([...current, article]);
      }
    },
    []
  );

  const removeFavorite = useCallback((url: string) => {
    const current = getSnapshot();
    saveFavorites(current.filter((f) => f.url !== url));
  }, []);

  return { favorites, isFavorited, toggleFavorite, removeFavorite };
}
