import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import Header from "@/components/nav/Header";
import LanguageProvider from "@/components/provider/LanguageProvider";
import { ThemeProvider } from "next-themes";

import ChatWrapper from "@/components/assistant/ChatWrapper";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ⭐ Import the official provider
import { NextIntlClientProvider } from "next-intl";
import { set } from "lodash"; // ✅ install: npm install lodash

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malaria Retrieval System",
  description:
    "An advanced system for retrieving and analyzing malaria information.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // 🔹 Fetch translations from your backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/translations/${locale}`,
    { cache: "no-store" }
  );
  const flatMessages = await res.json();

  // 🔹 Convert flat keys (e.g. "home.hero.title") into nested objects
  const messages = Object.entries(flatMessages).reduce(
    (acc, [key, value]) => set(acc, key, value),
    {}
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* ✅ Use NextIntlClientProvider instead of custom TranslationProvider */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LanguageProvider locale={locale} />

            <Header />
            <ChatWrapper />
            <main className="pt-0">{children}</main>
          </NextIntlClientProvider>

          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
