"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const supportedLocales = ["en", "ar"];
const defaultLocale = "en";

export default function LocaleRedirector() {
  const router = useRouter();

  useEffect(() => {
    const storedLocale = localStorage.getItem("i18next");
    let localeToUse = defaultLocale;
    if (storedLocale && supportedLocales.includes(storedLocale)) {
      localeToUse = storedLocale;
    }
    document.cookie = `i18next=${localeToUse}; path=/; max-age=31536000`;
    const currentPath = window.location.pathname;
    if (!supportedLocales.some((loc) => currentPath.startsWith(`/${loc}`))) {
      router.replace(`/${localeToUse}${currentPath}`);
    }
    if (!sessionStorage.getItem("alertShown")) {
      sessionStorage.setItem("alertShown", "true");
    }
  }, [router]);

  return null;
}
