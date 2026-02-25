"use client";

import { useEffect } from "react";
import { useHeader } from "@/components/layout/header-context";
import { FavoritesList } from "@/components/favorites/favorites-list";

export default function FavoritesPage() {
  const { setTitle, setShowBack } = useHeader();

  useEffect(() => {
    setTitle("Favorites");
    setShowBack(true);
  }, [setTitle, setShowBack]);

  return <FavoritesList />;
}
