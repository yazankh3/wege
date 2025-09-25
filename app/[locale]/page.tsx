"use client";

import { MainLayout } from "@/components/layout/mainLayout/MainLayout";
import { useThemeMode } from "@/hooks/useThemeMode";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { toggleFavourite } from "@/lib/store/slices/favouritesSlice";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroSlides = [
  {
    title: "pages.home.title",
    subtitle: "pages.home.subtitle",
    image: "/electronics-components.png",
  },
  {
    title: "pages.home.title",
    subtitle: "pages.home.subtitle",
    image: "/diverse-clothing-rack.png",
  },
  {
    title: "pages.home.title",
    subtitle: "pages.home.subtitle",
    image: "/diverse-products-still-life.png",
  },
];
const sampleProducts = [
  {
    id: 1,
    name: "Modern Smart Watch",
    price: 299.99,
    image: "/electronics-components.png",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Chic Designer Bag",
    price: 459.99,
    image: "/diverse-products-still-life.png",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Casual Urban Sneakers",
    price: 119.99,
    image: "/diverse-clothing-rack.png",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 349.99,
    image: "/diverse-products-still-life.png",
    category: "Home & Garden",
  },
  {
    id: 5,
    name: "High-Fidelity Headset",
    price: 199.99,
    image: "/electronics-components.png",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Vintage Denim Jacket",
    price: 89.99,
    image: "/diverse-clothing-rack.png",
    category: "Clothing",
  },
];

export default function HomePage() {
  const { mode } = useThemeMode();

  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const favouriteItems = useAppSelector((state) => state.favourites.items);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
  ];

  const handleAddToCart = (product: (typeof sampleProducts)[0]) =>
    dispatch(addToCart(product));
  const handleToggleFavourite = (product: (typeof sampleProducts)[0]) =>
    dispatch(toggleFavourite(product));
  const isFavourite = (id: number) =>
    favouriteItems.some((item) => item.id === id);

  const filteredProducts = sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || p.category === selectedCategory)
  );
  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box
          sx={{
            height: { xs: "60vh", sm: "70vh", md: "85vh" },
            mb: 6,
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow:
              mode === "dark"
                ? "0 12px 40px rgba(0,0,0,0.8)"
                : "0 12px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            effect="fade"
            style={{ height: "100%" }}
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      background:
                        mode === "dark"
                          ? "rgba(30,30,30,0.6)"
                          : "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "24px",
                      // height: "100%",
                      p: { xs: 3, sm: 5, md: 6 },
                      maxWidth: 700,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant={isSm ? "h4" : isMd ? "h3" : "h2"}
                      fontWeight={800}
                      gutterBottom
                      sx={{
                        background:
                          mode === "dark"
                            ? "linear-gradient(90deg, #fff, #aaa)"
                            : "linear-gradient(90deg, #333, #555)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        textShadow:
                          mode === "dark"
                            ? "0px 4px 15px rgba(0,0,0,0.6)"
                            : "0px 4px 15px rgba(0,0,0,0.2)",
                      }}
                    >
                      {t(slide.title)}
                    </Typography>
                    <Typography
                      variant={isSm ? "body1" : "h6"}
                      mb={4}
                      fontWeight={300}
                      sx={{ color: mode === "dark" ? "#ddd" : "#222" }}
                    >
                      {t(slide.subtitle)}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "50px",
                        px: 5,
                        py: 1.5,
                        fontSize: isSm ? "0.9rem" : "1.1rem",
                        background:
                          mode === "dark"
                            ? "linear-gradient(90deg, #6a11cb, #2575fc)"
                            : "linear-gradient(90deg, #2575fc, #6a11cb)",
                        boxShadow:
                          mode === "dark"
                            ? "0 6px 25px rgba(37,117,252,0.5)"
                            : "0 6px 25px rgba(0,0,0,0.2)",
                        "&:hover": {
                          boxShadow:
                            mode === "dark"
                              ? "0 8px 30px rgba(37,117,252,0.6)"
                              : "0 8px 30px rgba(0,0,0,0.25)",
                        },
                      }}
                    >
                      {t("common.shopNow")}
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                label={t("common.search") || "Search Products"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    "& fieldset": {
                      borderColor: mode === "dark" ? "#555" : "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: mode === "dark" ? "#888" : "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: mode === "dark" ? "#42a5f5" : "#1068af",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: mode === "dark" ? "#aaa" : "#555",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  borderRadius: "16px",
                  backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
                  color: mode === "dark" ? "#fff" : "#000",
                  "& .MuiSelect-icon": {
                    color: mode === "dark" ? "#fff" : "#000",
                  },
                  "& fieldset": {
                    borderColor: mode === "dark" ? "#555" : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? "#888" : "#888",
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    ${product.price}
                  </Typography>
                  <Box
                    display="flex"
                    gap={1}
                    mt={2}
                    flexDirection={isSm ? "column" : "row"}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        <ShoppingCart
                          sx={{
                            marginInlineEnd:
                              i18n.language === "ar" ? "10px" : "0",
                          }}
                        />
                      }
                      fullWidth
                      sx={{ borderRadius: "25px" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {t("common.addToCart") || "Add to Cart"}
                    </Button>
                    <IconButton
                      color={isFavourite(product.id) ? "secondary" : "default"}
                      sx={{ alignSelf: isSm ? "flex-start" : "center" }}
                      onClick={() => handleToggleFavourite(product)}
                    >
                      {isFavourite(product.id) ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}
