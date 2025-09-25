"use client";

import { PriceDisplay } from "@/components/atoms/PriceDisplay/PriceDisplay";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { removeFromFavourites } from "@/lib/store/slices/favouritesSlice";
import {
  Delete,
  Favorite,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FavouriteItemProps {
  item: {
    id: any;

    name: string;
    price: number;
    image: string;
  };
}

export const FavouriteItem: React.FC<FavouriteItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    dispatch(removeFromFavourites(item.id));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAddingToCart(false);
  };

  const handleViewDetails = () => {
    router.push(`/products/${item.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: 2,
        overflow: "hidden",
        ...(isRemoving && { opacity: 0, transform: "scale(0.9)" }),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          "& img": { transform: "scale(1.05)" },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="200"
          image={item.image || "/images/placeholder.png"}
          alt={item.name}
          sx={{ transition: "transform 0.3s ease" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            p: 1,
          }}
        >
          <IconButton onClick={handleRemove} color="error" size="small">
            <Delete />
          </IconButton>
          <Chip
            icon={
              <Favorite
                style={{
                  marginInlineStart: i18n.language === "ar" ? "10px" : "",
                }}
              />
            }
            label={t("favourites.favourite")}
            color="secondary"
            size="small"
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {item.name}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <PriceDisplay price={item.price} variant="h6" />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="contained"
          startIcon={
            <ShoppingCart
              sx={{
                marginInlineEnd: i18n.language === "ar" ? "10px" : "",
              }}
            />
          }
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          fullWidth
        >
          {isAddingToCart ? "Adding..." : t("common.addToCart")}
        </Button>
        <IconButton onClick={handleViewDetails}>
          <Visibility />
        </IconButton>
      </CardActions>
    </Card>
  );
};
