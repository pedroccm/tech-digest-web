import { CategoryKey, CategoryMeta } from "@/types/digest";

export const API_BASE = "https://n8n.pedromarques.tech/digest";

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  tech: {
    name: "Tech",
    icon: "💻",
    feeds: 155,
    color: "hsl(212, 100%, 67%)", // #58a6ff
  },
  design: {
    name: "Design",
    icon: "🎨",
    feeds: 156,
    color: "hsl(2, 100%, 72%)", // #ff7b72
  },
  business: {
    name: "Business",
    icon: "💼",
    feeds: 170,
    color: "hsl(137, 66%, 48%)", // #3fb950
  },
  crypto: {
    name: "Crypto",
    icon: "₿",
    feeds: 161,
    color: "hsl(39, 76%, 49%)", // #d29922
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
