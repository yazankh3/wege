import { formatRating } from "@/lib/utils/api";
import { Box, Rating, SxProps, Theme, Typography } from "@mui/material";
import type React from "react";

interface RatingDisplayProps {
  rating: number;
  reviews?: number;
  showReviews?: boolean;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviews,
  showReviews = true,
  size = "small",
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,  
        ...sx,
      }}
    >
      <Rating
        value={rating}
        precision={0.1}
        readOnly
        size={size}
        sx={{ color: "#ffa726" }} 
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: "nowrap" }}
      >
        {formatRating(rating)}
        {showReviews && reviews ? ` (${reviews} reviews)` : ""}
      </Typography>
    </Box>
  );
};
