"use client";

import type React from "react";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { CartItem } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/molecules/CartSummary";
import { EmptyState } from "@/components/molecules/EmptyState";
import { MainLayout } from "@/components/layout/mainLayout/MainLayout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { clearCart } from "@/lib/store/slices/cartSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useThemeMode } from "@/hooks/useThemeMode";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { mode } = useThemeMode();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.total);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTax = cartTotal * 0.08;
  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const finalTotal = cartTotal + estimatedTax + shippingCost;

  const handleClearCart = () => {
    if (window.confirm(t("messages.cartCleared") + "?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCheckingOut(false);
    toast.success(t("messages.orderPlaced"));
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <EmptyState
            title={t("pages.cart.empty")}
            description={t("pages.cart.emptyDescription")}
            actionText={t("pages.cart.continueShopping")}
            actionPath="/"
            icon={<ShoppingCartIcon />}
          />
        </Container>
      </MainLayout>
    );
  }

  return (
    <ErrorBoundary fallback={<div>{t("common.error")}</div>}>
      <MainLayout>
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, md: 4 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Breadcrumbs sx={{ mb: 4 }}>
            <Link
              href="/"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {t("navigation.home")}
            </Link>
            <Typography
              sx={{
                color: mode === "dark" ? "#ddd" : "#222",
              }}
            >
              {t("pages.cart.title")}
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 6,
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 0 },
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ShoppingCartIcon sx={{ fontSize: 32, color: "primary.main" }} />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: mode === "dark" ? "#fff" : "#222",

                  fontSize: { xs: "1.75rem", md: "2.125rem" },
                }}
              >
                {t("pages.cart.title")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: mode === "dark" ? "#ddd" : "#222",
                }}
              >
                ({totalItems}{" "}
                {totalItems === 1
                  ? t("", { count: totalItems })
                  : t("", { count: totalItems })}
                )
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: { xs: "100%", md: "auto" },
                justifyContent: { xs: "space-between", md: "flex-start" },
              }}
            >
              <Button
                variant="outlined"
                startIcon={
                  <ArrowBackIcon
                    sx={{
                      rotate: i18n.language === "ar" ? "180deg" : "",
                      marginInlineEnd: i18n.language === "ar" ? "10px" : "0",
                    }}
                  />
                }
                onClick={() => router.back()}
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                {t("pages.cart.continueShopping")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                {t("common.clear")} {t("pages.cart.title")}
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 4, color: "text.primary" }}
                  >
                    {t("pages.cart.title")}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {cartItems.map((item, index) => (
                      <Box key={item.id}>
                        <CartItem item={item} />
                        {index < cartItems.length - 1 && (
                          <Divider sx={{ my: 3 }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  position: "sticky",
                  top: 24,
                }}
              >
                <CartSummary
                  subtotal={cartTotal}
                  tax={estimatedTax}
                  shipping={shippingCost}
                  total={finalTotal}
                  onCheckout={handleCheckout}
                  isCheckingOut={isCheckingOut}
                />

                <Card sx={{ backgroundColor: "#f9f9f9" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
                    >
                      {t("pages.checkout.shippingAddress")}
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {shippingCost === 0
                        ? t("pages.checkout.shippingAddressInfo.freeShipping")
                        : t("messages.addMoreForFreeShipping", {
                            remaining: (50 - cartTotal).toFixed(2),
                          })}
                    </Alert>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        • {t("pages.checkout.standardDelivery")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        • {t("pages.checkout.expressDelivery")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        • {t("pages.checkout.freeReturns")}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default CartPage;
