"use client";

import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import type React from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: "primary" | "secondary" | "inherit";
  fullScreen?: boolean;
  sx?: SxProps<Theme>;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "primary",
  fullScreen = false,
  sx,
}) => {
  const containerStyles: SxProps<Theme> = fullScreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
        ...sx,
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        ...sx,
      };

  return (
    <Box sx={containerStyles}>
      <CircularProgress size={size} color={color} />
    </Box>
  );
};
