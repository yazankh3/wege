"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { PriceDisplay } from "@/components/atoms/PriceDisplay/PriceDisplay";
import { RatingDisplay } from "@/components/atoms/RatingDisplay/RatingDisplay";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { MainLayout } from "@/components/layout/mainLayout/MainLayout";
import { EmptyState } from "@/components/molecules/EmptyState";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { useProduct } from "@/lib/hooks/useProducts";
import { addToCart } from "@/lib/store/slices/cartSlice";
import {
  addToFavourites,
  removeFromFavourites,
} from "@/lib/store/slices/favouritesSlice";
import {
  ArrowBack as ArrowBackIcon,
  AssignmentReturn as AssignmentReturnIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const router = useRouter();
  const theme = useTheme();
  const { mode } = useThemeMode();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const productId = Number.parseInt(params.id);

  const { data: product, isLoading, error } = useProduct(productId);
  const favourites = useAppSelector((state) => state.favourites.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isFavourite = product
    ? favourites.some((item) => item.id === product.id)
    : false;
  const isInCart = product
    ? cartItems.some((item) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      );
    }
  };

  const handleToggleFavourite = () => {
    if (!product) return;

    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
    } else {
      dispatch(
        addToFavourites({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      );
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) setQuantity(newQuantity);
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {}
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner fullScreen />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <Container>
          <EmptyState
            title={t("product.productNotFound")}
            description={t("product.productRemoved")}
            actionText={t("back")}
            actionPath="/"
          />
        </Container>
      </MainLayout>
    );
  }

  const sx = {
    container: { px: 3, [theme.breakpoints.down("sm")]: { px: 1.5 }, py: 4 },
    breadcrumbs: { mb: 3 },
    breadcrumbLink: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
    },
    backButton: { mb: 4, textTransform: "none" },
    productContainer: { mb: 6 },
    imageSection: { position: "sticky", top: 4 },
    mainImageContainer: {
      position: "relative",
      borderRadius: 2,
      overflow: "hidden",
      mb: 3,
      bgcolor: "#f5f5f5",
    },
    thumbnailContainer: { display: "flex", gap: 1, justifyContent: "center" },
    thumbnail: {
      width: 80,
      height: 80,
      borderRadius: 2,
      overflow: "hidden",
      cursor: "pointer",
      border: "2px solid transparent",
      transition: "all 0.2s ease",
      "&:hover": { borderColor: theme.palette.primary.main },
    },
    activeThumbnail: { borderColor: theme.palette.primary.main },
    productInfo: { py: 3 },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      mb: 3,
      [theme.breakpoints.down("sm")]: { flexDirection: "column", gap: 1 },
    },
    productTitle: {
      fontWeight: 700,
      lineHeight: 1.2,
      color: mode === "dark" ? "#ddd" : "#222",
    },
    headerActions: { display: "flex", gap: 1 },
    ratingSection: { mb: 3 },
    priceSection: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      mb: 4,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      },
    },
    description: { lineHeight: 1.6, mb: 4, color: "#666" },
    featuresSection: { mb: 4 },
    featuresTitle: { fontWeight: 600, mb: 3 },
    featuresList: { display: "flex", flexWrap: "wrap", gap: 1 },
    featureChip: { bgcolor: "#f5f5f5" },
    actionsSection: { mb: 4, p: 4, bgcolor: "#f9f9f9", borderRadius: 2 },
    quantitySection: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      mb: 3,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      },
    },
    quantityLabel: { fontWeight: 500 },
    quantityControls: { display: "flex", alignItems: "center", gap: 1 },
    quantityButton: { minWidth: 40, height: 40, borderRadius: "50%" },
    quantityValue: {
      minWidth: 40,
      textAlign: "center",
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    addToCartButton: {
      textTransform: "none",
      fontWeight: 600,
      p: 3,
      borderRadius: 2,
    },
    serviceInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      p: 4,
      bgcolor: "#f5f5f5",
      borderRadius: 2,
    },
    serviceItem: { display: "flex", alignItems: "center", gap: 3 },
    serviceIcon: { color: theme.palette.primary.main, fontSize: "1.5rem" },
    serviceTitle: { fontWeight: 600 },
    detailsSection: { mt: 6 },
    divider: { my: 6 },
    detailsCard: { height: "100%" },
    specificationsCard: { height: "100%" },
    detailsTitle: { fontWeight: 600, mb: 3 },
    detailsText: { lineHeight: 1.6, mb: 3, color: "#666" },
    specsList: { display: "flex", flexDirection: "column", gap: 3 },
    specItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      pb: 1,
      borderBottom: "1px solid #eee",
    },
    specLabel: { fontWeight: 500, color: "#666" },
  };

  return (
    <ErrorBoundary>
      <MainLayout>
        <Container maxWidth="lg" sx={sx.container}>
          <Breadcrumbs sx={sx.breadcrumbs}>
            <Link href="/" sx={sx.breadcrumbLink}>
              {t("navigation.home")}
            </Link>
            <Link href="/" sx={sx.breadcrumbLink}>
              {t("navigation.products")}
            </Link>
            <Link href={`/category/${product.category}`} sx={sx.breadcrumbLink}>
              {product.category}
            </Link>
            <Typography
              sx={{
                color: mode === "dark" ? "#ddd" : "#222",
              }}
            >
              {product.name}
            </Typography>
          </Breadcrumbs>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={sx.backButton}
            variant="outlined"
          >
            {t("back")}
          </Button>

          <Grid container spacing={4} sx={sx.productContainer}>
            <Grid item xs={12} md={6}>
              <Box sx={sx.imageSection}>
                <Box sx={sx.mainImageContainer}>
                  <Image
                    src={
                      product.images[selectedImage]?.startsWith("http")
                        ? product.images[selectedImage]
                        : `${product.images[selectedImage]}`
                    }
                    alt={product.name}
                    width={500}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                  />

                  {!product.inStock && (
                    <Chip
                      label={t("common.outOfStock")}
                      color="error"
                      sx={{ position: "absolute", top: 2, left: 2, zIndex: 2 }}
                    />
                  )}
                </Box>

                <Box sx={sx.thumbnailContainer}>
                  {product.images.map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        ...sx.thumbnail,
                        ...(selectedImage === index ? sx.activeThumbnail : {}),
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={sx.productInfo}>
                <Box sx={sx.header}>
                  <Typography variant="h4" component="h1" sx={sx.productTitle}>
                    {product.name}
                  </Typography>
                  <Box sx={sx.headerActions}>
                    <IconButton
                      onClick={handleToggleFavourite}
                      color={isFavourite ? "secondary" : "default"}
                    >
                      {isFavourite ? (
                        <FavoriteIcon
                          sx={{
                            color: mode === "dark" ? "#ddd" : "#222",
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            color: mode === "dark" ? "#ddd" : "#222",
                          }}
                        />
                      )}
                    </IconButton>
                    <IconButton onClick={handleShare}>
                      <ShareIcon
                        sx={{
                          color: mode === "dark" ? "#ddd" : "#222",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={sx.ratingSection}>
                  <RatingDisplay
                    rating={product.rating}
                    reviews={product.reviews}
                    size="medium"
                  />
                </Box>

                <Box sx={sx.priceSection}>
                  <PriceDisplay price={product.price} variant="h4" />
                  <Chip
                    label={
                      product.inStock
                        ? t("common.inStock")
                        : t("common.outOfStock")
                    }
                    color={product.inStock ? "success" : "error"}
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body1" sx={sx.description}>
                  {product.description ?? "Description"}
                </Typography>

                <Box sx={sx.featuresSection}>
                  <Typography variant="h6" sx={sx.featuresTitle}>
                    {t("product.features")}
                  </Typography>
                  <Box sx={sx.featuresList}>
                    {product.features?.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature ?? "Test"}
                        variant="outlined"
                        sx={sx.featureChip}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={sx.actionsSection}>
                  <Box sx={sx.quantitySection}>
                    <Typography variant="body2" sx={sx.quantityLabel}>
                      {t("common.quantity")}:
                    </Typography>
                    <Box sx={sx.quantityControls}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        sx={sx.quantityButton}
                      >
                        -
                      </Button>
                      <Typography variant="body1" sx={sx.quantityValue}>
                        {quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                        sx={sx.quantityButton}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    sx={sx.addToCartButton}
                    fullWidth
                  >
                    {isInCart ? "Add More to Cart" : t("common.addToCart")}
                  </Button>
                </Box>

                <Box sx={sx.serviceInfo}>
                  <Box sx={sx.serviceItem}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        •{" "}
                        {t(
                          "pages.checkout.standardDelivery",
                          "Standard delivery: 3-5 business days"
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        •{" "}
                        {t(
                          "pages.checkout.expressDelivery",
                          "Express delivery: 1-2 business days (+$15)"
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        •{" "}
                        {t(
                          "pages.checkout.freeReturns",
                          "Free returns within 30 days"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={sx.detailsSection}>
            <Divider sx={sx.divider} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card sx={sx.detailsCard}>
                  <CardContent>
                    <Typography variant="h6" sx={sx.detailsTitle}>
                      {t("product.description")}
                    </Typography>
                    <Typography variant="body1" sx={sx.detailsText}>
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={sx.specificationsCard}>
                  <CardContent>
                    <Typography variant="h6" sx={sx.detailsTitle}>
                      {t("product.specifications")}
                    </Typography>
                    <Box sx={sx.specsList}>
                      <Box sx={sx.specItem}>
                        <Typography variant="body2" sx={sx.specLabel}>
                          {t("common.category")}:
                        </Typography>
                        <Typography variant="body2">
                          {product.category ?? "Test"}
                        </Typography>
                      </Box>
                      <Box sx={sx.specItem}>
                        <Typography variant="body2" sx={sx.specLabel}>
                          {t("common.rating")}:
                        </Typography>
                        <Typography variant="body2">
                          {product.rating ?? 0}/5
                        </Typography>
                      </Box>
                      <Box sx={sx.specItem}>
                        <Typography variant="body2" sx={sx.specLabel}>
                          {t("common.reviews")}:
                        </Typography>
                        <Typography variant="body2">
                          {product.reviews ?? "Test"}
                        </Typography>
                      </Box>
                      <Box sx={sx.specItem}>
                        <Typography variant="body2" sx={sx.specLabel}>
                          {t("product.availability")}:
                        </Typography>
                        <Typography variant="body2">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default ProductPage;
