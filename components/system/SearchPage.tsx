"use client";

import Link from "next/link";
import React, { useState } from "react";
import { articles } from "@/lib/articles"; // Import shared data

const SearchPage = () => {
  const [query, setQuery] = useState("");

  // Filter articles by search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

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
            onChange={(e) => setQuery(e.target.value)} // ✅ update query state
            placeholder="Search for malaria symptoms, outbreaks, research papers..."
            className="w-full px-5 py-3 pl-12 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-600 dark:text-sky-400 text-lg">
            🔍
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
              onClick={() => setQuery(tag.replace(/^[^\s]+\s/, ""))} // ✅ Clicking a tag sets the search
              className="text-sm bg-sky-50 dark:bg-gray-800 text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-gray-700 hover:bg-sky-100 dark:hover:bg-gray-700 rounded-full px-4 py-2 shadow-sm transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic Document Results */}
        <div className="space-y-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <Link
                  href={`/articles/${article.id}`} // ✅ Goes to dynamic route
                  className="text-sky-700 dark:text-sky-400 font-semibold text-base"
                >
                  {article.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {article.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No results found.
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-10 text-center">
          <button className="bg-sky-600 dark:bg-sky-500 text-white px-6 py-3 rounded-full hover:bg-sky-700 dark:hover:bg-sky-600 shadow transition-all">
            📄 View Full Results
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
