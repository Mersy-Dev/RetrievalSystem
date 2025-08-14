// app/[locale]/articles/[id]/ArticleDetailClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ArticleDetailClientProps } from "@/lib/articles";
import TranslateSection from "./TranslateSection";


export default function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  const router = useRouter();

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold text-red-600">Document Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-20 p-6 space-y-10">
      {/* Hero Section */}
      <section className="bg-sky-50 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-sky-700">{article.title}</h1>
        <p className="text-gray-500 text-sm mt-1">
          By <span className="font-medium">{article.author}</span> • {article.date}
        </p>
        <p className="mt-4 text-gray-700">{article.description}</p>
      </section>

      {/* Key Facts / Quick Info */}
      <section className="bg-white p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 mb-4">Key Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Disease:</strong> Malaria</li>
          <li><strong>Geographic Focus:</strong> Africa, Asia, South America</li>
          <li><strong>Transmission:</strong> Mosquito-borne (Anopheles species)</li>
          <li><strong>Prevention:</strong> Insecticide-treated nets, prophylactic drugs</li>
          <li><strong>Diagnosis:</strong> Blood smears, rapid diagnostic tests (RDTs)</li>
        </ul>
      </section>

      {/* Main Article Content */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 mb-4">Article</h2>
        <div className="text-gray-800 whitespace-pre-line">{article.content}</div>
      </section>

      {/* Translation / Transcription Section */}
      {/* <section className="bg-sky-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 mb-4">
          Translate / Transcribe to Your Local Language
        </h2>
        <p className="text-gray-600 mb-4">
          Select your preferred language to view this article in a translated format.
          (Feature coming soon)
        </p>
        <button
          disabled
          className="px-4 py-2 bg-sky-300 text-white rounded cursor-not-allowed"
        >
          🌍 Translate
        </button>
      </section> */}

      <TranslateSection content={article.content} />


      {/* Related Articles Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 mb-4">Related Articles</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/articles/symptoms"
              className="text-sky-600 hover:underline"
            >
              Common Symptoms of Malaria in Children
            </Link>
          </li>
          <li>
            <Link
              href="/articles/guidelines"
              className="text-sky-600 hover:underline"
            >
              2025 WHO Guidelines for Malaria Treatment
            </Link>
          </li>
          <li>
            <Link
              href="/articles/outbreaks"
              className="text-sky-600 hover:underline"
            >
              Malaria Outbreaks in West Africa – Case Report
            </Link>
          </li>
        </ul>
      </section>

      {/* Back to Search */}
      <div className="pt-4">
        <Link
          href="/system"
          className="text-sky-600 hover:underline font-medium"
        >
          ← Back to Search
        </Link>
      </div>
    </div>
  );
}
