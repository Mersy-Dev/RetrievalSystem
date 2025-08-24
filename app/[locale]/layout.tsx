import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Header from "@/components/nav/Header";
import LanguageProvider from "@/components/provider/LanguageProvider"; // Importar el nuevo componente

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
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider locale={locale} />

        <NextIntlClientProvider messages={messages}>
          <Header />
          
          {/* 👇 Add padding so content starts below header */}
          <main className="pt-20">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
