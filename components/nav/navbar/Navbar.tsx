"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";


const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDropdown, setInfoDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();


  const handleLanguageChange = (lang: string) => {
    const segments = pathname.split("/");
    const newPath = segments.slice(2).join("/") || ""; // remove locale segment
    router.replace(`/${lang}/${newPath}`);
  };

  return (
    <nav className="w-full bg-white text-sm font-medium py-4 px-6 lg:fixed lg:top-0 z-30 shadow-sm border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 relative">
        {/* Logo and Tagline */}
        <Link href="/" className="flex flex-col items-start">
          <Image
            src="/images/logo.png"
            alt="Malaria System Logo"
            width={140}
            height={36}
            className="object-contain"
          />
          <span className="text-[10px] text-gray-500 leading-none mt-1">
            Intelligent Malaria Awareness System
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-black rounded"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between w-full mx-14">
          <div className="flex gap-6 items-center text-gray-700 relative">
            <Link
              href="/#campaigns"
              className="hover:text-sky-600 transition-colors duration-200"
            >
              {t("malariaCampaign")}
            </Link>

            {/* Information Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setInfoDropdown(true)}
              onMouseLeave={() => setInfoDropdown(false)}
            >
              <button className="hover:text-sky-600 flex items-center gap-1 transition-colors duration-200">
                {t("information")}
                <ChevronDown size={16} />
              </button>
              {infoDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 z-50">
                  <Link
                    href="/info/what-is-malaria"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    What is Malaria?
                  </Link>
                  <Link
                    href="/info/symptoms"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Symptoms
                  </Link>
                  <Link
                    href="/info/prevention"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Prevention
                  </Link>
                  <Link
                    href="/info/treatment"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
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
              <button className="hover:text-sky-600 flex items-center gap-1 transition-colors duration-200">
                {t("resources")}
                <ChevronDown size={16} />
              </button>
              {resourcesDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-56 z-50">
                  <Link
                    href="/resources/reports"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Reports
                  </Link>
                  <Link
                    href="/resources/educational"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Educational Materials
                  </Link>
                  <Link
                    href="/resources/faq"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    FAQs
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-sky-600 transition-colors duration-200"
            >
              {t("about")}
            </Link>

            {/* <Link
              href="/contact"
              className="hover:text-sky-600 transition-colors duration-200"
            >
              {t("contact")}
            </Link> */}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={locale} // use the current locale as value
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-700 hover:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
            >
              <option value="en">
                {locale === "en" ? "English" : "Gẹ̀ẹ́sì"}
              </option>
              <option value="yo">
                {locale === "yo" ? "Yorùbá" : "Yorùbá"}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navbar;
