"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments } from "@/redux/document/Thunk";
import { Loader2, Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

function SearchPageContent() {
  const dispatch = useAppDispatch();
  const locale = useLocale(); // 👈 Get current language (e.g. "en" or "yo")
  const { allDocuments, loading, error } = useAppSelector(
    (state) => state.documents
  );
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const t = useTranslations("system"); // 👈 Use "Search" namespace (JSON below)

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const filteredDocs = allDocuments.filter((doc) =>
    (locale === "yo" ? doc.titleYo : doc.title)
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  const visibleDocs = filteredDocs.slice(0, visibleCount);

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-20 transition-colors duration-300">
      <div className="md:w-3/4 w-full mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
            {t("title")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t("description")}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(3);
            }}
            placeholder={t("searchPlaceholder")}
            className="w-full px-5 py-3 pl-12 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-600 dark:text-sky-400 text-lg">
            <Search className="w-5 h-5" />
          </span>
        </div>

        {/* Tag Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {t.raw("tags").map((tag: string) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag.replace(/^[^\s]+\s/, ""));
                setVisibleCount(3);
              }}
              className="text-sm bg-sky-50 dark:bg-gray-800 text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-gray-700 hover:bg-sky-100 dark:hover:bg-gray-700 rounded-full px-4 py-2 shadow-sm transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic Results */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">
              {t("system.ui.errorText")}
            </p>
          ) : visibleDocs.length > 0 ? (
            visibleDocs.map((doc) => (
              <div
                key={doc.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <Link
                  href={`/articles/${doc.id}`}
                  className="text-sky-700 dark:text-sky-400 font-semibold text-base"
                >
                  {locale === "yo" ? doc.titleYo || doc.title : doc.title}
                </Link>

                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {locale === "yo"
                    ? doc.descriptionYo || "Ko sí àlàyé tó wà nínú èdè Yorùbá."
                    : doc.description || "No description available."}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {locale === "yo"
                    ? `Onkọwe: ${doc.author} | Ọdún ìtẹ̀jáde: ${doc.publishedYear}`
                    : `Author: ${doc.author} | Published: ${doc.publishedYear}`}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t("ui.noResultsText")}
            </p>
          )}
        </div>

        {/* Pagination Button */}
        {visibleCount < filteredDocs.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="bg-sky-600 dark:bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-700 dark:hover:bg-sky-600 shadow transition-all"
            >
              {t("ui.viewMoreButton")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Provider store={store}>
      <SearchPageContent />
    </Provider>
  );
}
