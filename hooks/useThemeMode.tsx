import { createContext, ReactNode, useContext, useState } from "react";

type ThemeModeContextType = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined
);

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  return context;
};
