"use client";

import { useThemeMode } from "@/hooks/useThemeMode";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import type React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionPath?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionPath,
  icon,
}) => {
  const router = useRouter();
  const { mode } = useThemeMode();
  const handleAction = () => {
    if (actionPath) {
      router.push(actionPath);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 6,
        minHeight: 300,
      }}
    >
      {icon && (
        <Box
          sx={{
            mb: 4,
            opacity: 0.6,
            "& svg": { fontSize: "4rem", color: "grey.400" },
          }}
        >
          {icon}
        </Box>
      )}

      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: mode === "dark" ? "#fff" : "#222",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 6, color: "grey.600", maxWidth: 400, lineHeight: 1.6 }}
      >
        {description}
      </Typography>

      {actionText && actionPath && (
        <Button
          variant="contained"
          onClick={handleAction}
          sx={{ textTransform: "none", fontWeight: 600, px: 4, py: 1 }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};
