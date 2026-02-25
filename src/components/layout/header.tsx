"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowLeft, Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeader } from "./header-context";
import { useFavorites } from "@/hooks/use-favorites";

export function Header() {
  const router = useRouter();
  const { title, showBack } = useHeader();
  const { theme, setTheme } = useTheme();
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">
          {title}
        </h1>

        <Link href="/favorites">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Heart
              className={`h-5 w-5 ${hasFavorites ? "fill-heart-active text-heart-active" : ""}`}
            />
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="shrink-0"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
