"use client";

interface ArticleStatsProps {
  showing: number;
  free: number;
  paid: number;
}

export function ArticleStats({ showing, free, paid }: ArticleStatsProps) {
  return (
    <div className="flex gap-6 text-xs uppercase tracking-wider text-muted-foreground">
      <span>
        Showing <span className="font-semibold text-foreground">{showing}</span>
      </span>
      <span>
        Free <span className="font-semibold text-green-500">{free}</span>
      </span>
      <span>
        Paid <span className="font-semibold text-red-500">{paid}</span>
      </span>
    </div>
  );
}
