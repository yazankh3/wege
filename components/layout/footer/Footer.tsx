"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        pt: 10,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
            >
              <Box
                sx={{ p: 3, bgcolor: "#2a2a2a", borderRadius: 3, boxShadow: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {t("footer.company")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.8, opacity: 0.8 }}
                >
                  {t("footer.description")}
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Box
                sx={{ p: 3, bgcolor: "#2a2a2a", borderRadius: 3, boxShadow: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {t("footer.quickLinks")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    t("navigation.home"),
                    t("navigation.products"),
                    t("navigation.cart"),
                    t("navigation.favourites"),
                  ].map((link, i) => (
                    <Link
                      key={i}
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: 14,
                        py: 0.5,
                        borderRadius: 2,
                        "&:hover": {
                          color: "#26c6da",
                          transform: "scale(1.05)",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Box
                sx={{ p: 3, bgcolor: "#2a2a2a", borderRadius: 3, boxShadow: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {t("footer.categories")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    t("footer.electronics"),
                    t("footer.fashion"),
                    t("footer.homeGarden"),
                    t("footer.sports"),
                  ].map((category, i) => (
                    <Link
                      key={i}
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: 14,
                        py: 0.5,
                        borderRadius: 2,
                        "&:hover": {
                          color: "#26c6da",
                          transform: "scale(1.05)",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      {category}
                    </Link>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Box
                sx={{ p: 3, bgcolor: "#2a2a2a", borderRadius: 3, boxShadow: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {t("footer.support")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    t("footer.helpCenter"),
                    t("footer.contactUs"),
                    t("footer.shippingInfo"),
                    t("footer.returns"),
                  ].map((link, i) => (
                    <Link
                      key={i}
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: 14,
                        py: 0.5,
                        borderRadius: 2,
                        "&:hover": {
                          color: "#26c6da",
                          transform: "scale(1.05)",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: 1,
            borderColor: "rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>
            {t("footer.copyright")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton sx={{ color: "#fff", "&:hover": { color: "#26c6da" } }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff", "&:hover": { color: "#26c6da" } }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff", "&:hover": { color: "#26c6da" } }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
