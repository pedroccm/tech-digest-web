"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface DateCardProps {
  category: string;
  date: string;
}

export function DateCard({ category, date }: DateCardProps) {
  return (
    <Link href={`/${category}/${date}`}>
      <Card className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary">
        <CardContent className="flex items-center justify-between p-4">
          <span className="text-base font-medium">{formatDate(date)}</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  );
}
