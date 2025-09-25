"use client";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { MainLayout } from "@/components/layout/mainLayout/MainLayout";
import { EmptyState } from "@/components/molecules/EmptyState";
import { FavouriteItem } from "@/components/molecules/FavouriteItem";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { removeFromFavourites } from "@/lib/store/slices/favouritesSlice";
import {
  ArrowBack as ArrowBackIcon,
  ClearAll as ClearAllIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const FavouritesPage: React.FC = () => {
  const router = useRouter();
  const { mode } = useThemeMode();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const favouriteItems = useAppSelector((state) => state.favourites.items);
  const [isAddingAllToCart, setIsAddingAllToCart] = useState(false);

  const handleClearFavourites = () => {
    toast.info(
      <div>
        <Typography
          sx={{
            color: "#222",
          }}
        >
          {t("favourites.clearAllConfirm")}
        </Typography>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            onClick={() => {
              favouriteItems.forEach((item) =>
                dispatch(removeFromFavourites(item.id))
              );
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
  const handleAddAllToCart = async () => {
    setIsAddingAllToCart(true);
    for (const item of favouriteItems) {
      dispatch(addToCart(item));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setIsAddingAllToCart(false);
    toast.success(
      t("favourites.addedAllToCart", { count: favouriteItems.length })
    );
  };

  if (!favouriteItems.length) {
    return (
      <MainLayout>
        <Container
          maxWidth="lg"
          sx={{ py: 4, textAlign: "center", minHeight: 300 }}
        >
          <EmptyState
            title={t("favourites.emptyTitle")}
            description={t("favourites.emptyDescription")}
            actionText={t("favourites.discoverProducts")}
            actionPath="/"
            icon={
              <FavoriteIcon sx={{ fontSize: 48, color: "rgba(0,0,0,0.3)" }} />
            }
          />
        </Container>
      </MainLayout>
    );
  }

  return (
    <ErrorBoundary fallback={<div>{t("favourites.failedLoad")}</div>}>
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link href="/">{t("navigation.home")}</Link>
            <Typography
              sx={{
                color: mode === "dark" ? "#ddd" : "#222",
              }}
            >
              {t("favourites.favourites")}
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FavoriteIcon sx={{ fontSize: 32, color: "secondary.main" }} />
              <Typography
                variant="h4"
                sx={{
                  color: mode === "dark" ? "#fff" : "#222",
                }}
              >
                {t("favourites.favourites")}
              </Typography>
              <Chip
                label={t("favourites.itemsCount", {
                  count: favouriteItems.length,
                })}
                color="secondary"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                startIcon={
                  <ArrowBackIcon
                    sx={{
                      transform:
                        i18n.language === "ar"
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      marginInlineEnd: i18n.language === "ar" ? "10px" : "",
                    }}
                  />
                }
                onClick={() => router.back()}
              >
                {t("favourites.backToShopping")}
              </Button>
              <Button
                startIcon={
                  <ShoppingCartIcon
                    sx={{
                      marginInlineEnd: i18n.language === "ar" ? "10px" : "",
                    }}
                  />
                }
                onClick={handleAddAllToCart}
                disabled={isAddingAllToCart}
              >
                {isAddingAllToCart
                  ? t("favourites.adding")
                  : t("favourites.addAllToCart")}
              </Button>
              <Button
                color="error"
                startIcon={
                  <ClearAllIcon
                    sx={{
                      marginInlineEnd: i18n.language === "ar" ? "10px" : "",
                    }}
                  />
                }
                onClick={handleClearFavourites}
              >
                {t("favourites.clearAll")}
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {favouriteItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <FavouriteItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default FavouritesPage;
