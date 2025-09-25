"use client";

import { PriceDisplay } from "@/components/atoms/PriceDisplay/PriceDisplay";
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax,
  shipping,
  total,
  onCheckout,
  isCheckingOut = false,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          {t("pages.cart.orderSummary", "Order Summary")}
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              "&:last-child": { mb: 0 },
            }}
          >
            <Typography variant="body1">{t("common.subtotal")}:</Typography>
            <PriceDisplay price={subtotal} variant="body1" />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              "&:last-child": { mb: 0 },
            }}
          >
            <Typography variant="body1">{t("common.tax")}:</Typography>
            <PriceDisplay price={tax} variant="body1" />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              "&:last-child": { mb: 0 },
            }}
          >
            <Typography variant="body1">{t("common.shipping")}:</Typography>
            {shipping === 0 ? (
              <Typography
                variant="body1"
                sx={{ color: "#4caf50", fontWeight: 600 }}
              >
                {t("pages.checkout.shippingAddressInfo.freeShipping", "FREE")}
              </Typography>
            ) : (
              <PriceDisplay price={shipping} variant="body1" />
            )}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              p: 2,
              borderRadius: 1,
              mb: 0,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {t("common.total")}:
            </Typography>
            <PriceDisplay
              price={total}
              variant="h6"
              sx={{ fontWeight: 700, color: "primary.main" }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onCheckout}
          disabled={isCheckingOut}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            p: 2,
            borderRadius: 1,
            background:
              "linear-gradient(135deg, primary.main 0%, #1565c0 100%)",
            mb: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
          startIcon={
            isCheckingOut ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <PaymentIcon />
            )
          }
        >
          {isCheckingOut
            ? t("pages.checkout.processing", t("pages.checkout.processing"))
            : t("common.checkout")}
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            p: 1,
            bgcolor: "#f0f8ff",
            borderRadius: 1,
          }}
        >
          <SecurityIcon sx={{ color: "#4caf50", fontSize: "1rem" }} />
          <Typography sx={{ fontWeight: 500 }}>
            {t("pages.checkout.securePayment", "Secure Payment")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
