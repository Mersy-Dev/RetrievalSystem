"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getKnowledgeByCategory, searchKnowledge } from "@/components/utils/loadMalariaData";

type KnowledgeItem = {
  id: string | number;
  question_en: string;
  answer_en: string;
  answer_yo?: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "others";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    setLoading(true);

    if (category === "others") {
      const res = searchKnowledge(query);
      setResults(res);
    } else {
      const res = getKnowledgeByCategory(category);
      setResults(res);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {category === "others"
          ? "Ask any malaria question"
          : `${category} Information`}
      </h1>

      {category === "others" && (
        <textarea
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Type your malaria question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      {category !== "others" && (
        <p className="text-gray-700 mb-4">
          You selected: <strong>{category}</strong>
        </p>
      )}

      <button
        onClick={handleSearch}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        {loading ? "Loading..." : "Search"}
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((item) => (
            <div key={item.id} className="border p-3 rounded-lg">
              <h3 className="font-semibold">{item.question_en}</h3>
              <p className="text-gray-800">{item.answer_en}</p>

              <h4 className="mt-2 font-semibold text-sm">Yoruba:</h4>
              <p className="text-gray-700 text-sm">{item.answer_yo}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && (
        <p className="mt-4 text-gray-500">No results yet.</p>
      )}
    </div>
  );
}
