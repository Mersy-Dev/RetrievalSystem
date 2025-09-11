"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";

export default function TranslateSection({ content }: { content: string }) {
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslated(null);

    try {
      const res = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: content,
          source: "en",
          target: "yo", // Yoruba
          format: "text",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch translation");
      }

      const data = await res.json();
      if (data?.translatedText) {
        setTranslated(data.translatedText);
        console.log("Translation successful:", data.translatedText);
      } else {
        setTranslated("(Translation failed — please try again)");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslated("(Error occurred during translation)");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = (text: string, fileName: string) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save(fileName);
  };

  return (
    <section className="bg-sky-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300">
        Translate / Transcribe to Your Local Language
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        View the document below and translate it to Yoruba with one click.
      </p>

      {/* Original Document */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 whitespace-pre-line">
        {content}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleTranslate}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-sky-300 cursor-not-allowed dark:bg-sky-700"
              : "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          }`}
        >
          {loading ? "Translating..." : "🌍 Translate to Yoruba"}
        </button>

        {/* Download Original PDF */}
        <button
          onClick={() => handleDownloadPDF(content, "article-original.pdf")}
          className="flex items-center gap-1 px-3 py-2 border rounded text-sky-700 dark:text-sky-300 border-gray-300 dark:border-gray-600 hover:bg-sky-100 dark:hover:bg-gray-700"
        >
          <FileText size={18} /> View/Download Original
        </button>

        {/* Download Translated PDF */}
        {translated && (
          <button
            onClick={() => handleDownloadPDF(translated, "article-yoruba.pdf")}
            className="flex items-center gap-1 px-3 py-2 border rounded text-green-700 dark:text-green-300 border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-gray-700"
          >
            <Download size={18} /> Download Yoruba
          </button>
        )}
      </div>

      {/* Translated Document */}
      {translated && (
        <div className="bg-green-50 dark:bg-gray-800 p-4 rounded border border-green-200 dark:border-gray-700 text-green-900 dark:text-green-300 whitespace-pre-line mt-4">
          <h3 className="font-semibold mb-2">Translated Version (Yoruba):</h3>
          {translated}
        </div>
      )}
    </section>
  );
}
