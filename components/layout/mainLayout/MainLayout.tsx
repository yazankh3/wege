import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";
import { Box } from "@mui/material";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          mode === "dark"
            ? "linear-gradient(180deg, #121212, #1e1e1e)"
            : "linear-gradient(180deg, #f5f5f5, #ffffff)",
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, py: { xs: 2, sm: 4 } }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
