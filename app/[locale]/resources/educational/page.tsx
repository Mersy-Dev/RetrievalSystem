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
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-indigo-700">{t("title")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t("intro")}</p>
      </section>

      {/* Search bar */}
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
        <p className="text-center text-gray-500">{t("noResults")}</p>
      )}
    </div>
  );
}
