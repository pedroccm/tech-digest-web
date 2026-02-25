"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import type { Article, CategoryKey } from "@/types/digest";

interface ArticleCardProps {
  article: Article;
  category: string;
  date: string;
  index: number;
  isFavorited: boolean;
  showMeta?: boolean;
}

export function ArticleCard({
  article,
  category,
  date,
  index,
  isFavorited,
  showMeta,
}: ArticleCardProps) {
  return (
    <Link href={`/${category}/${date}/${index}`}>
      <Card className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold uppercase text-primary">
              {article.newsletter}
            </span>
            {isFavorited && (
              <Heart className="h-4 w-4 shrink-0 fill-[hsl(var(--heart-active))] text-[hsl(var(--heart-active))]" />
            )}
          </div>

          <h3 className="text-sm font-medium leading-snug">{article.title}</h3>

          <div className="flex items-center gap-2">
            <Badge
              variant={article.paid ? "destructive" : "default"}
              className={
                article.paid
                  ? ""
                  : "bg-green-600 text-white hover:bg-green-700"
              }
            >
              {article.paid ? "PAID" : "FREE"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatTime(article.published_at)}
            </span>
            {showMeta && (
              <span className="text-xs text-muted-foreground">
                · {(category as string).charAt(0).toUpperCase() + (category as string).slice(1)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
