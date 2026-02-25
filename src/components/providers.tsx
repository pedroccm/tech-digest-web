"use client";

import { ThemeProvider } from "./theme-provider";
import { HeaderProvider } from "./layout/header-context";
import { Header } from "./layout/header";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HeaderProvider>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
      </HeaderProvider>
    </ThemeProvider>
  );
}
