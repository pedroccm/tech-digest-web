"use client";

import { ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import type { Article, CategoryKey, FavoriteArticle } from "@/types/digest";

interface ArticleReaderProps {
  article: Article;
  category: CategoryKey;
  date: string;
  index: number;
}

export function ArticleReader({
  article,
  category,
  date,
  index,
}: ArticleReaderProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(article.url);

  const favArticle: FavoriteArticle = {
    ...article,
    category,
    date,
    index,
  };

  const hasContent =
    article.content_html && article.content_html.length > 100;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold leading-tight">{article.title}</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant={article.paid ? "destructive" : "default"}
          className={
            article.paid ? "" : "bg-green-600 text-white hover:bg-green-700"
          }
        >
          {article.paid ? "PAID" : "FREE"}
        </Badge>
        <span className="text-sm text-primary font-medium">
          {article.newsletter}
        </span>
        <span className="text-sm text-muted-foreground">
          {formatDateTime(article.published_at)}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(favArticle)}
          className="ml-auto"
        >
          <Heart
            className={`h-6 w-6 transition-colors ${
              favorited
                ? "fill-[hsl(var(--heart-active))] text-[hsl(var(--heart-active))]"
                : "text-muted-foreground hover:text-[hsl(var(--heart-active))]"
            }`}
          />
        </Button>
      </div>

      {hasContent ? (
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content_html }}
        />
      ) : (
        <div className="rounded-lg border border-border bg-muted/50 px-6 py-12 text-center">
          <p className="text-muted-foreground">
            No content available. Open the original article to read it.
          </p>
        </div>
      )}

      <Button asChild className="bg-green-600 hover:bg-green-700">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Original
        </a>
      </Button>
    </div>
  );
}
