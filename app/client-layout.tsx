"use client";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import i18n from "@/i18n";
import { Analytics } from "@vercel/analytics/next";
import React, { Suspense, useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Providers } from "./providers";

function HtmlDirectionUpdater() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <HtmlDirectionUpdater />
      <Providers>
        <ErrorBoundary fallback={<div>App failed to load</div>}>
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      </Providers>
      <Analytics />
    </I18nextProvider>
  );
}
