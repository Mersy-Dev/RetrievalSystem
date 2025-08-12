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
    <div className="md:w-3/4 w-full mx-auto bg-white p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-sky-700">
          Malaria Intelligence Search
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Retrieve scholarly health info, case insights, and data-driven answers.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // ✅ update query state
          placeholder="Search for malaria symptoms, outbreaks, research papers..."
          className="w-full px-5 py-3 pl-12 text-gray-700 border border-sky-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-600 text-lg">
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
            className="text-sm bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100 rounded-full px-4 py-2 shadow-sm transition-all"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Dynamic Document Results */}
      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="border-b pb-4">
              <Link
                href={`/articles/${article.id}`} // ✅ Goes to dynamic route
                className="text-sky-700 font-semibold text-base"
              >
                {article.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>

      {/* Footer Action */}
      <div className="mt-10 text-center">
        <button className="bg-sky-600 text-white px-6 py-3 rounded-full hover:bg-sky-700 shadow transition-all">
          📄 View Full Results
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
