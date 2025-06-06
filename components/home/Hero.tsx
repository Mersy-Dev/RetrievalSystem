"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="bg-white py-16 mt-2 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            {t("title") || "Smarter Malaria Awareness Starts Here"}
          </h1>
          <p className="text-lg text-gray-600">
            {t("description") ||
              "Empowering health workers, students, and communities with intelligent malaria data retrieval and insights."}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/educator"
              className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition"
            >
              {t("cta") || "Join the Fight Against Malaria"}
            </Link>
            <Link
              href="/signup"
              className="border border-sky-600 text-sky-600 py-2 px-4 rounded hover:bg-sky-50 transition"
            >
              {t("cta2") || "Explore Malaria Data"}
            </Link>
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5 mt-4 space-y-1">
            <li>{t("feature1") || "Access comprehensive malaria data"}</li>
            <li>{t("feature2") || "Get real-time updates on outbreaks"}</li>
            <li>{t("feature3") || "Learn about prevention and treatment"}</li>
            <li>{t("feature4") || "Engage with community health workers"}</li>
          </ul>
        </div>

        {/* Right Malaria Input Assistant Box */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-sky-50 to-white shadow-2xl rounded-2xl p-8 border border-sky-200">
          <h2 className="text-xl font-semibold text-sky-700 mb-2">
            {t("rightTitle") || "Malaria Intelligence Assistant"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t("rightDescription") || "Search for symptoms, treatments, or trusted malaria-related insights."
      }
          </p>

          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search: e.g. malaria symptoms in children"
              className="w-full px-4 py-3 pr-12 border border-sky-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-200 shadow-sm"
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sky-600">
              🔍
            </span>
          </div>

          {/* Quick Action Tags */}
          <div className="mb-5 grid grid-cols-3 gap-3 text-sm">
            {[
              t("symButton") || "🦠 Symptoms",
              t("treatButton") || "💊 Treatment",
              t("outButton") || "🌍 Outbreaks",
              t("researchButton") || "📚 Research",
              t("awarenessButton") || "📈 Awareness",
              t("preventionButton") || "🛡️ Prevention",
            ].map((item) => (
              <button
                key={item}
                className="bg-white border border-sky-100 text-sky-700 hover:bg-sky-50 py-2 rounded-md shadow-sm transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Recent or Suggested Searches */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              {t("recentSearch") || "Recent Searches"}
            </p>
            <ul className="text-sm text-sky-700 space-y-1">
              <li className="hover:underline cursor-pointer">
               {t("commonSym") || " Common malaria symptoms in Nigeria"}

               
              </li>
              <li className="hover:underline cursor-pointer">
                 {t("malPrev") || "Malaria prevention tips for families"}

              </li>
              <li className="hover:underline cursor-pointer">
                   {t("bestTreat") || "Best treatment practices in 2025"}
              </li>
            </ul>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <button className="text-sky-600 text-sm font-semibold hover:underline">
                 {t("adInsight") || "📊 Advanced Insights"}
              
            </button>
            <div className="flex items-center gap-3">
              <button className="text-sm text-gray-600 hover:underline">
                 {t("uploadCase") || "📤 Upload Case"}
                
              </button>
              <button className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 shadow">
                {t("retrieveInfo") || "🔍 Retrieve Info"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
