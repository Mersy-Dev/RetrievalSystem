"use client";

import { ShieldCheck, Droplet, Leaf, Home } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PreventionPage() {
  const t = useTranslations("Prevention");

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-20 px-6 md:px-12 text-center transition-colors duration-300">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t("intro")}
        </p>
      </section>

      {/* Prevention Methods Grid */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mosquito Nets */}
          <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-12 h-12 text-green-600 dark:text-green-400" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {t("netsTitle")}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("netsDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Eliminate Breeding Sites */}
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-start gap-4">
              <Droplet className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {t("breedingTitle")}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("breedingDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Protective Clothing */}
          <div className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-start gap-4">
              <Leaf className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {t("clothingTitle")}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("clothingDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Indoor Protection */}
          <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-start gap-4">
              <Home className="w-12 h-12 text-purple-600 dark:text-purple-400" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {t("indoorTitle")}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("indoorDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 md:px-12 text-center transition-colors duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {t("ctaDesc")}
        </p>
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow transition">
          {t("ctaButton")}
        </button>
      </section>
    </div>
  );
}
