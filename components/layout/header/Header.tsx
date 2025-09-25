"use client";

import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/lib/hooks/redux";
import {
  Brightness4,
  Brightness7,
  Close as CloseIcon,
  Favorite,
  Home,
  Menu as MenuIcon,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();
  const { t, i18n } = useTranslation("navigation");
  const cartItems = useAppSelector((state) => state.cart.items);
  const favouriteItems = useAppSelector((state) => state.favourites.items);

  const lang =
    typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : "en";
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const favouritesCount = favouriteItems.length;

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    window.location.reload();
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const drawerVariants = {
    hidden: { x: currentLanguage === "ar" ? "100%" : "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
    exit: { x: currentLanguage === "ar" ? "100%" : "-100%" },
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(12px)",
          background:
            mode === "dark" ? "rgba(20,20,20,0.85)" : "rgba(255,255,255,0.85)",
          color: mode === "dark" ? "#fff" : "#000",
          boxShadow:
            mode === "dark"
              ? "0 8px 25px rgba(0,0,0,0.7)"
              : "0 8px 25px rgba(0,0,0,0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
          }}
        >
          <Box
            component={motion.div}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => router.push(`/${lang}`)}
          >
            <Home
              sx={{
                fontSize: 28,
                color:
                  mode !== "dark"
                    ? "#000"
                    : "#fff",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.03em",
                fontSize: { xs: "1.2rem", sm: "1.6rem" },
                background:
                  mode !== "dark"
                    ? "#000"
                    : "#fff",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              E-Shop
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <LanguageSwitcher
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                variant="menu"
              />
            </Box>
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => router.push(`/${lang}/favourites`)}
            >
              <Badge badgeContent={favouritesCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => router.push(`/${lang}/cart`)}
            >
              <Badge badgeContent={cartItemsCount} color="success">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              right: currentLanguage === "ar" ? 0 : "auto",
              left: currentLanguage === "ar" ? "auto" : 0,
              width: "80%",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              color: "#fff",
              zIndex: 1200,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/${lang}`)}
              >
                <Home sx={{ fontSize: 28, color: "#fff" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.2rem", sm: "1.6rem" },
                    background: "linear-gradient(to right, #fff, #bbdefb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  E-Shop
                </Typography>
              </Box>
              <IconButton
                onClick={() => setMobileOpen(false)}
                sx={{ color: "#fff" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

            <List sx={{ mt: 2, px: 2 }}>
              {[
                { label: t("home"), path: `/${lang}` },
                { label: t("favourites"), path: `/${lang}/favourites` },
                { label: t("cart"), path: `/${lang}/cart` },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: currentLanguage === "ar" ? 40 : -40,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      router.push(item.path);
                      setMobileOpen(false);
                    }}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      "&:hover": { background: "rgba(255,255,255,0.2)" },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                      }}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>

            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              variant="menu"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
