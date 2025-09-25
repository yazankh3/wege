"use client";

import {
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "" },
  { code: "ar", name: "العربية", flag: "" },
];

interface LanguageSwitcherProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  variant?: "button" | "menu";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage = "en",
  onLanguageChange,
  variant = "button",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode: string) => {
    localStorage.setItem("locale", languageCode);

    const direction = languageCode === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = languageCode;

    onLanguageChange?.(languageCode);
    handleClose();
  };
  if (variant === "menu") {
    return (
      <Box sx={{ position: "relative" }}>
        <Button
          onClick={handleClick}
          startIcon={<LanguageIcon />}
          endIcon={<ExpandMoreIcon />}
          sx={{
            textTransform: "none",
            color: "inherit",
            px: 2,
            py: 1,
            borderRadius: 1,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            minWidth: 120,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {currentLang.name}
            </Typography>
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              selected={language.code === currentLanguage}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                "&:hover": { backgroundColor: "#f5f5f5" },
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.main" },
                },
              }}
            >
              <Typography variant="body2">{language.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {languages.map((language) => (
        <Button
          key={language.code}
          variant={language.code === currentLanguage ? "contained" : "outlined"}
          size="small"
          onClick={() => handleLanguageSelect(language.code)}
          sx={{
            textTransform: "none",
            minWidth: 60,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>{language.flag}</span>
          {language.code.toUpperCase()}
        </Button>
      ))}
    </Box>
  );
};
