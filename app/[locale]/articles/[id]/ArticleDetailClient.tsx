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
        <h1 className="text-xl font-bold text-red-600 dark:text-red-400">Document Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-2 transition-colors duration-300">
      <div className="max-w-4xl mx-auto my-20 p-6 space-y-10">
      {/* Hero Section */}
      <section className="bg-sky-50 dark:bg-gray-900 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">{article.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          By <span className="font-medium">{article.author}</span> • {article.date}
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-200">{article.description}</p>
      </section>

      {/* Key Facts / Quick Info */}
      <section className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Key Information</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
          <li><strong>Disease:</strong> Malaria</li>
          <li><strong>Geographic Focus:</strong> Africa, Asia, South America</li>
          <li><strong>Transmission:</strong> Mosquito-borne (Anopheles species)</li>
          <li><strong>Prevention:</strong> Insecticide-treated nets, prophylactic drugs</li>
          <li><strong>Diagnosis:</strong> Blood smears, rapid diagnostic tests (RDTs)</li>
        </ul>
      </section>

      {/* Main Article Content */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Article</h2>
        <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{article.content}</div>
      </section>

      {/* Translate Section */}
      <TranslateSection content={article.content} />

      {/* Related Articles Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Related Articles</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/articles/symptoms"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              Common Symptoms of Malaria in Children
            </Link>
          </li>
          <li>
            <Link
              href="/articles/guidelines"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              2025 WHO Guidelines for Malaria Treatment
            </Link>
          </li>
          <li>
            <Link
              href="/articles/outbreaks"
              className="text-sky-600 dark:text-sky-400 hover:underline"
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
          className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
        >
          ← Back to Search
        </Link>
      </div>
    </div>
    </section>
  );
}
