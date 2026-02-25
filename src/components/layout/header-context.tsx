"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface HeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  showBack: boolean;
  setShowBack: (show: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  title: "Digest Hub",
  setTitle: () => {},
  showBack: false,
  setShowBack: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitleState] = useState("Digest Hub");
  const [showBack, setShowBack] = useState(false);

  const setTitle = useCallback((t: string) => setTitleState(t), []);

  return (
    <HeaderContext.Provider value={{ title, setTitle, showBack, setShowBack }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
