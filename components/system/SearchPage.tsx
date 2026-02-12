"use client";

import { useState, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments } from "@/redux/document/Thunk";
import { Loader2, Search, FileText, Calendar, User } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

/* ---------------- HELPERS ---------------- */

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const shuffleArray = <T,>(array: T[]) =>
  [...array].sort(() => Math.random() - 0.5);

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const keywords = normalizeText(query).split(/\s+/).filter(Boolean);
  let highlightedText = text;
  
  keywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">$1</mark>'
    );
  });
  
  return highlightedText;
};

/* ---------------- COMPONENT ---------------- */

function SearchPageContent() {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations("system");

  const { allDocuments, loading, error } = useAppSelector(
    (state) => state.documents
  );

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  // Simulate search delay for Google-like experience
  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      setHasSearched(false);
      
      const startTime = Date.now();
      const timer = setTimeout(() => {
        setIsSearching(false);
        setHasSearched(true);
        setSearchTime((Date.now() - startTime) / 1000);
      }, 800); // Simulate 0.8s search time

      return () => clearTimeout(timer);
    } else {
      setHasSearched(false);
    }
  }, [query]);

  /* Randomize docs ONLY when query is empty */
  const docsSource = useMemo(() => {
    return query.trim() ? allDocuments : shuffleArray(allDocuments);
  }, [query, allDocuments]);

  /* Filter by keyword with relevance scoring */
  const filteredDocs = useMemo(() => {
    if (!query.trim()) return docsSource;

    const keywords = normalizeText(query).split(/\s+/).filter(Boolean);

    return docsSource
      .map((doc) => {
        const title = locale === "yo" ? doc.titleYo || "" : doc.title || "";
        const description =
          locale === "yo" ? doc.descriptionYo || "" : doc.description || "";

        const normalizedTitle = normalizeText(title);
        const normalizedDesc = normalizeText(description);

        let score = 0;

        keywords.forEach((word) => {
          // Title matches are worth more
          if (normalizedTitle.includes(word)) score += 3;
          if (normalizedDesc.includes(word)) score += 1;
        });

        return { ...doc, relevanceScore: score };
      })
      .filter((doc) => doc.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [docsSource, query, locale]);

  const visibleDocs = filteredDocs.slice(0, visibleCount);
  const showInitialView = !query.trim() && !hasSearched;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section - Google-like */}
      <div
        className={`transition-all duration-500 ${
          showInitialView
            ? "pt-32 pb-20"
            : "pt-8 pb-6 border-b border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Logo/Title */}
          <div
            className={`text-center transition-all duration-500 ${
              showInitialView ? "mb-10" : "mb-6"
            }`}
          >
            <h1
              className={`font-bold text-sky-600 dark:text-sky-400 transition-all duration-500 ${
                showInitialView ? "text-5xl mb-4" : "text-2xl mb-2"
              }`}
            >
              {t("title")}
            </h1>
            {showInitialView && (
              <p className="text-gray-600 dark:text-gray-400 text-lg animate-fade-in">
                {t("description")}
              </p>
            )}
          </div>

          {/* Search Bar - Google Style */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(10);
                }}
                placeholder={t("searchPlaceholder")}
                className="w-full px-5 py-4 pl-14 pr-14 text-base text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-all duration-300"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setVisibleCount(10);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search suggestions / Quick tags */}
            {showInitialView && (
              <div className="mt-8 animate-fade-in">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
                  Popular searches:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {t.raw("tags").map((tag: string) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(tag.replace(/^[^\s]+\s/, ""));
                        setVisibleCount(10);
                      }}
                      className="text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-md rounded-full px-4 py-2 transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Stats - Google-like */}
        {hasSearched && !isSearching && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
            About {filteredDocs.length} results ({searchTime.toFixed(2)} seconds)
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {/* Initial Loading */}
        {loading && !allDocuments.length ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{t("ui.errorText")}</p>
          </div>
        ) : (
          <>
            {/* Results */}
            {hasSearched && !isSearching && (
              <div className="space-y-8">
                {visibleDocs.length > 0 ? (
                  visibleDocs.map((doc, index) => {
                    const title = locale === "yo" ? doc.titleYo || doc.title : doc.title;
                    const description =
                      locale === "yo"
                        ? doc.descriptionYo || "Ko sí àlàyé tó wà nínú èdè Yorùbá."
                        : doc.description || "No description available.";

                    return (
                      <article
                        key={doc.id}
                        className="group animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Breadcrumb / Source */}
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            articles › {doc.id}
                          </span>
                        </div>

                        {/* Title */}
                        <Link
                          href={`/articles/${doc.id}`}
                          className="block mb-2"
                        >
                          <h2
                            className="text-xl font-normal text-sky-700 dark:text-sky-400 hover:underline group-hover:underline"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(title, query),
                            }}
                          />
                        </Link>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {doc.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {doc.publishedYear}
                          </span>
                        </div>

                        {/* Description */}
                        <p
                          className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              description.slice(0, 180) +
                                (description.length > 180 ? "..." : ""),
                              query
                            ),
                          }}
                        />
                      </article>
                    );
                  })
                ) : (
                  <div className="text-center py-20 animate-fade-in">
                    <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                      {t("ui.noResultsText")}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Show More Button */}
            {hasSearched && !isSearching && visibleCount < filteredDocs.length && (
              <div className="mt-12 text-center animate-fade-in">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="bg-sky-600 dark:bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-700 dark:hover:bg-sky-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("ui.viewMoreButton")} ({filteredDocs.length - visibleCount} more)
                </button>
              </div>
            )}

            {/* Initial State - Featured/Random Documents */}
            {showInitialView && allDocuments.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                  Featured Documents
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {docsSource.slice(0, 6).map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/articles/${doc.id}`}
                      className="block p-5 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg transition-all duration-300 group"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {locale === "yo" ? doc.titleYo || doc.title : doc.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {locale === "yo"
                          ? doc.descriptionYo || "Ko sí àlàyé."
                          : doc.description || "No description."}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span>{doc.author}</span>
                        <span>•</span>
                        <span>{doc.publishedYear}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        mark {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

/* ---------------- PROVIDER ---------------- */

export default function SearchPage() {
  return (
    <Provider store={store}>
      <SearchPageContent />
    </Provider>
  );
}