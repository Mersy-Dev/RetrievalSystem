"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import MaterialCard from "@/components/educational/MaterialCards";

export default function EducationalMaterialsPage() {
  const t = useTranslations("EducationalMaterials");
  const [search, setSearch] = useState("");

  const materials = [
    {
      id: 1,
      title: t("materials.1.title"),
      description: t("materials.1.description"),
      type: "PDF",
      size: "2.3 MB",
    },
    {
      id: 2,
      title: t("materials.2.title"),
      description: t("materials.2.description"),
      type: "DOCX",
      size: "1.1 MB",
    },
    {
      id: 3,
      title: t("materials.3.title"),
      description: t("materials.3.description"),
      type: "Image",
      size: "800 KB",
    },
  ];

  const filtered = materials.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <section className=" text-center space-y-3">
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("intro")}
        </p>
      </section>

      {/* Search bar */}
      <div className="flex items-center gap-3 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Materials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <MaterialCard
            key={m.id}
            title={m.title}
            description={m.description}
            type={m.type}
            size={m.size}
            viewLabel={t("view")}
            downloadLabel={t("download")}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("noResults")}
        </p>
      )}
    </div>
    </section>
  );
}
