"use client";

import type React from "react";
import { Typography, SxProps, Theme } from "@mui/material";
import { formatPrice } from "@/lib/utils/api";

interface PriceDisplayProps {
  price: number;
  variant?: "h4" | "h5" | "h6" | "body1" | "body2";
  color?: "primary" | "secondary" | "textPrimary" | "textSecondary";
  sx?: SxProps<Theme>;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  variant = "h6",
  color = "primary",
  sx,
}) => {
  return (
    <Typography
      variant={variant}
      color={color}
      component="span"
      sx={{
        fontWeight: 600,
        letterSpacing: "-0.02em",
        ...sx,
      }}
    >
      {formatPrice(price)}
    </Typography>
  );
};
