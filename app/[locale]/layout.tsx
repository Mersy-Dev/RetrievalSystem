import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import Header from "@/components/nav/Header";
import LanguageProvider from "@/components/provider/LanguageProvider";
import { ThemeProvider } from "next-themes";

import ChatWrapper from "@/components/assistant/ChatWrapper";
import './chat-animations.css';  

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NextIntlClientProvider } from "next-intl";
import { set } from "lodash";

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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Fetch translations from your backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/translations/${locale}`,
    { cache: "no-store" }
  );
  const flatMessages = await res.json();

  // Convert flat keys into nested objects
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
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LanguageProvider locale={locale} />

            <Header />
            <ChatWrapper lang={locale as "en" | "yo"} />
            <main className="pt-0">{children}</main>
          </NextIntlClientProvider>

          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
