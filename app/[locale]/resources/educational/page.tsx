"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import MaterialCard from "@/components/educational/MaterialCards";
import Image from "next/image";

type Material = {
  id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  url: string;
};

export default function EducationalMaterialsPage() {
  const t = useTranslations("EducationalMaterials");
  const [search, setSearch] = useState("");
  const [previewDoc, setPreviewDoc] = useState<Material | null>(null);

  const materials: Material[] = [
    {
      id: 1,
      title: t("materials.1.title"),
      description: t("materials.1.description"),
      type: "PDF",
      size: "2.3 MB",
      url: "/docs/pdfs/doc-sample.pdf", // add real document path
    },
    {
      id: 2,
      title: t("materials.2.title"),
      description: t("materials.2.description"),
      type: "DOCX",
      size: "1.1 MB",
      url: "/docs/words/doc-sample.docx",
    },
    {
      id: 3,
      title: t("materials.3.title"),
      description: t("materials.3.description"),
      type: "Image",
      size: "800 KB",
      url: "/images/malaria/moscrim.jpg",
    },
  ];

  const filtered = materials.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <section className="text-center space-y-3">
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
              onView={() => setPreviewDoc(m)} // pass function
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("noResults")}
          </p>
        )}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold mb-4">{previewDoc.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {previewDoc.description}
            </p>

            <div className="w-full h-[70vh] bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-xl overflow-hidden">
              {previewDoc.type === "PDF" ? (
                <iframe
                  src={previewDoc.url}
                  className="w-full h-full"
                  title={previewDoc.title}
                />
              ) : previewDoc.type === "Image" ? (
                <Image
                  src={previewDoc.url}
                  alt={previewDoc.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-center text-gray-500">
                  {t("previewNotSupported")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
