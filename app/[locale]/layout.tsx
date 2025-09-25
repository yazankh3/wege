import LocaleRedirector from "@/components/molecules/LocaleRedirector";
import ThemeProviderWrapper from "@/provider/ThemeProviderWrapper";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "../client-layout";
import "../globals.css";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce Application",
  generator: "Yazan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProviderWrapper>
          <LocaleRedirector />
          <ToastContainer position="top-right" autoClose={3000} />
          <ClientLayout>{children}</ClientLayout>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
