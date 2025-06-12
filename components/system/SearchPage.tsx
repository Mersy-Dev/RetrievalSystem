  "use client";

  import React from "react";

  const SearchPage = () => {
    return (
      <div className="md:w-3/4 w-full mx-auto bg-white  p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sky-700">Malaria Intelligence Search</h2>
          <p className="text-sm text-gray-600 mt-2">
            Retrieve scholarly health info, case insights, and data-driven answers.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
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
              className="text-sm bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100 rounded-full px-4 py-2 shadow-sm transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Simulated Document Results */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-sky-700 font-semibold text-base">
              Common Symptoms of Malaria in Children
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Overview of early warning signs and clinical patterns identified in children under age 12...
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-sky-700 font-semibold text-base">
              2025 WHO Guidelines for Malaria Treatment
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Summary of treatment protocols for both mild and severe malaria cases...
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-sky-700 font-semibold text-base">
              Malaria Outbreaks in West Africa – Case Report
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              An analysis of reported outbreak cases in 2024 across selected West African regions...
            </p>
          </div>
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
