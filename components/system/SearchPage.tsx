"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments } from "@/redux/document/Thunk";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";

const SearchPageContent = () => {
  const dispatch = useAppDispatch();
  const { allDocuments, loading, error } = useAppSelector(
    (state) => state.documents
  );

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // ✅ Show only 4 initially

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  // Filter documents by search term
  const filteredDocs = allDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(query.toLowerCase())
  );

  // Slice the visible documents
  const visibleDocs = filteredDocs.slice(0, visibleCount);

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-20 transition-colors duration-300">
      <div className="md:w-3/4 w-full mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
            Malaria Intelligence Search
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Retrieve scholarly health info, case insights, and data-driven
            answers.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(3); // ✅ Reset pagination on new search
            }}
            placeholder="Search for malaria symptoms, outbreaks, research papers..."
            className="w-full px-5 py-3 pl-12 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-600 dark:text-sky-400 text-lg">
            <Search className="w-5 h-5" />
          </span>
        </div>

        {/* Keyword Tag Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            "🧬 Malaria Symptoms",
            "💊 Treatment Guidelines",
            "🌍 Regional Outbreaks",
            "📚 Latest Research",
            "📈 Case Studies",
            "🛡️ Preventive Measures",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag.replace(/^[^\s]+\s/, ""));
                setVisibleCount(3); // ✅ Reset when using a tag
              }}
              className="text-sm bg-sky-50 dark:bg-gray-800 text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-gray-700 hover:bg-sky-100 dark:hover:bg-gray-700 rounded-full px-4 py-2 shadow-sm transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic Document Results */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">
              Failed to fetch documents. Try again.
            </p>
          ) : visibleDocs.length > 0 ? (
            visibleDocs.map((doc) => (
              <div
                key={doc.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                {/* Document Title */}
                <Link
                  href={`/articles/${doc.id}`}
                  className="text-sky-700 dark:text-sky-400 font-semibold text-base"
                >
                  {doc.title}
                </Link>

                {/* Document Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {doc.description || "No description available."}
                </p>

                {/* Author and Published Year */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Author: {doc.author} | Published: {doc.publishedYear}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No results found.
            </p>
          )}
        </div>

        {/* Footer Pagination Button */}
        {visibleCount < filteredDocs.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)} // ✅ Show next 4
              className="bg-sky-600 dark:bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-700 dark:hover:bg-sky-600 shadow transition-all"
            >
              📄 View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default function SearchPage() {
  return (
    <Provider store={store}>
      <SearchPageContent />
    </Provider>
  );
}
