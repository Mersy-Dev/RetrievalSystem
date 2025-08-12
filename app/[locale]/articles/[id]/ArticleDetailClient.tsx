// app/[locale]/articles/[id]/ArticleDetailClient.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ArticleDetailClientProps } from "@/lib/articles";

export default function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  const router = useRouter();

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-6">
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-sky-700">{article.title}</h1>
      <p className="text-gray-500 text-sm mt-1">
        {article.author} • {article.date}
      </p>

      <p className="mt-4 text-gray-700">{article.description}</p>

      <div className="mt-6 text-gray-800 whitespace-pre-line">
        {article.content}
      </div>

      <div className="mt-8">
        <Link href="/system" className="text-sky-600 hover:underline font-medium">
          ← Back to Search
        </Link>
      </div>
    </div>
  );
}
