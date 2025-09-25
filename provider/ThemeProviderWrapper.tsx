"use client";

import { ReactNode } from "react";
import { ThemeModeProvider, useThemeMode } from "@/hooks/useThemeMode";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export default function ThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeModeProvider>
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </ThemeModeProvider>
  );
}

function InnerThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
