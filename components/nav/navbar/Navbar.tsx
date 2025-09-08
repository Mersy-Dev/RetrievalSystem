"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDropdown, setInfoDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true); // ensures hydration consistency
  }, []);

  const handleLanguageChange = (lang: string) => {
    const segments = pathname.split("/");
    const newPath = segments.slice(2).join("/") || "";
    router.replace(`/${lang}/${newPath}`);
  };

  if (!mounted) return null; // prevent hydration issues with next-themes

  return (
    <nav className="w-full bg-white dark:bg-gray-900 text-sm font-medium py-4 px-6 lg:fixed lg:top-0 z-30 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 relative">
        {/* Logo and Tagline */}
        <Link href="/" className="flex flex-col items-start">
          <Image
            src="/images/malaria/logo.jpeg"
            alt="Malaria System Logo"
            width={45}
            height={36}
            className="object-contain"
          />
          <span className="text-[10px] text-gray-500 dark:text-gray-300 leading-none mt-1">
            Intelligent Malaria Awareness System
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white rounded"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between w-full mx-14">
          <div className="flex gap-6 items-center text-gray-700 dark:text-gray-200 relative">
            <Link
              href="/#campaigns"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              {t("MalariaHome")}
            </Link>

            {/* Information Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setInfoDropdown(true)}
              onMouseLeave={() => setInfoDropdown(false)}
            >
              <button className="hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors duration-200">
                {t("information")}
                <ChevronDown size={16} />
              </button>
              {infoDropdown && (
                <div className="absolute top-full left-0 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 w-48 z-50">
                  <Link href="/info/symptoms" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Symptoms
                  </Link>
                  <Link href="/info/prevention" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Prevention
                  </Link>
                  <Link href="/info/treatment" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Treatment
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdown(true)}
              onMouseLeave={() => setResourcesDropdown(false)}
            >
              <button className="hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors duration-200">
                {t("resources")}
                <ChevronDown size={16} />
              </button>
              {resourcesDropdown && (
                <div className="absolute top-full left-0 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 w-56 z-50">
                  <Link href="/resources/educational" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Educational Materials
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              {t("about")}
            </Link>

            <Link
              href="/dashboard"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              {t("dashboard") || "Dashboard"}
            </Link>
          </div>

          {/* Language & Theme Switchers */}
          <div className="flex items-center gap-4">
            {/* Language */}
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={locale}
              className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
            >
              <option value="en">{locale === "en" ? "English" : "Gẹ̀ẹ́sì"}</option>
              <option value="yo">{locale === "yo" ? "Yorùbá" : "Yorùbá"}</option>
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:border-sky-400 dark:hover:border-sky-400 transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navbar;
