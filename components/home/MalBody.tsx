"use client";
import { useTranslations } from "next-intl";


const MalBody = () => {

      const t = useTranslations("home.malBody");

  return (
     <section className="bg-sky-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 ">
      {/* Left Section: Info */}
      <div className="md:w-1/2 space-y-6">
        <div className="text-sky-700 text-sm font-semibold uppercase"> {t("awareness") || "Awareness"} </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("title") || "Built-in resources for malaria prevention and control"}
          
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
            {t("awarenessDescription") || 
                "Access reliable malaria prevention strategies and verified tools used by health workers and organizations globally."}
        </p>

        {/* Keyword Tags */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            "🛏️ Bed Nets",
            "💉 Malaria Vaccine",
            "🦟 Mosquito Repellent",
            "🌍 WHO Guidelines",
            "📊 Case Surveillance",
            "🚫 Stagnant Water Control",
          ].map((item) => (
            <button
              key={item}
              className="bg-white border border-sky-200 text-sky-700 rounded-full px-4 py-2 text-sm shadow-sm hover:bg-sky-100 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: Partners/Organizations */}
      <div className="md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-5">
        {[
          { name: "World Health Org", icon: "🌐" },
          { name: "CDC (US)", icon: "🧪" },
          { name: "UNICEF", icon: "🧒" },
          { name: "Red Cross", icon: "➕" },
          { name: "Africa CDC", icon: "🌍" },
          { name: "Gavi", icon: "💉" },
        ].map((org) => (
          <div
            key={org.name}
            className="rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">{org.icon}</div>
            <p className="text-sm font-medium text-gray-700">{org.name}</p>
          </div>
        ))}
      </div>
    </div>
     </section>
  );
};

export default MalBody;
