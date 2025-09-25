"use client";

import { PriceDisplay } from "@/components/atoms/PriceDisplay/PriceDisplay";
import { useAppDispatch } from "@/lib/hooks/redux";
import type { CartItem as CartItemType } from "@/lib/store/slices/cartSlice";
import { removeFromCart, updateQuantity } from "@/lib/store/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    toast.info(
      <div>
        <p>{`Remove ${item.name} from cart?`}</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            onClick={() => {
              dispatch(removeFromCart(item.id));
              toast.dismiss();
            }}
            style={{
              background: "#d32f2f",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t("yes")}
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              background: "#ddd",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t("no")}
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleViewProduct = () => {
    router.push(`/products/${item.id}`);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": { backgroundColor: "#f9f9f9" },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        onClick={handleViewProduct}
        sx={{
          flexShrink: 0,
          cursor: "pointer",
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={100}
          height={100}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography
          variant="h6"
          onClick={handleViewProduct}
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            color: "text.primary",
            transition: "color 0.2s ease",
            "&:hover": { color: "primary.main" },
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {item.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PriceDisplay
            price={item.price}
            variant="body1"
            color="textSecondary"
          />
          <Typography variant="body2" color="textSecondary">
            {t("common.perItem")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: "#666" }}>
            {t("common.quantity")}:
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "white",
                border: "1px solid #ddd",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                },
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body1"
              sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}
            >
              {item.quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "white",
                border: "1px solid #ddd",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 3,
          width: { xs: "100%", md: "auto" },
          flexDirection: { xs: "row", md: "column" },
        }}
      >
        <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {t("common.total")}:
          </Typography>
          <PriceDisplay price={itemTotal} variant="h6" />
        </Box>

        <IconButton
          color="error"
          onClick={handleRemove}
          sx={{
            p: 2,
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
