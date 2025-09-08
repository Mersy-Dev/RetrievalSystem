"use client";
import { useTranslations } from "next-intl";

const MalBody = () => {
  const t = useTranslations("home.malBody");

  return (
    <section className="bg-sky-50 dark:bg-gray-800 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Section: Info */}
        <div className="md:w-1/2 space-y-6">
          <div className="text-sky-700 dark:text-sky-400 text-sm font-semibold uppercase">
            {t("awareness") || "Awareness"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("title") ||
              "Built-in resources for malaria prevention and control"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            {t("awarenessDescription") ||
              "Access reliable malaria prevention strategies and verified tools used by health workers and organizations globally."}
          </p>

          {/* Keyword Tags */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              t("keyword1") || "🛏️ Bed Nets",
              t("keyword2") || "💊 💉 Malaria Vaccine",
              t("keyword3") || "🦟 Mosquito Repellent",
              t("keyword4") || "🌍 WHO Guidelines",
              t("keyword5") || "📊 Case Surveillance",
              t("keyword6") || "🚫 Stagnant Water Control",
            ].map((item) => (
              <button
                key={item}
                className="bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 rounded-full px-4 py-2 text-sm shadow-sm hover:bg-sky-100 dark:hover:bg-gray-700 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Partners/Organizations */}
        <div className="md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-5">
          {[
            { key: "org1", name: t("org1.name") || "Org 1", icon: t("org1.icon") || "🏥" },
            { key: "org2", name: t("org2.name") || "Org 2", icon: t("org2.icon") || "🌐" },
            { key: "org3", name: t("org3.name") || "Org 3", icon: t("org3.icon") || "🧬" },
            { key: "org4", name: t("org4.name") || "Org 4", icon: t("org4.icon") || "💉" },
            { key: "org5", name: t("org5.name") || "Org 5", icon: t("org5.icon") || "🦟" },
            { key: "org6", name: t("org6.name") || "Org 6", icon: t("org6.icon") || "🌍" },
          ].map((org) => (
            <div
              key={org.key}
              className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">{org.icon}</div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {org.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MalBody;
