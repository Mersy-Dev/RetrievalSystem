"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Link as LinkIcon,
  BookOpen,
  Calendar,
  User,
  Tag,
  Info,
  Star,
} from "lucide-react";

type Tag = {
  id?: number;
  name: string;
};

type Document = {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  publisher?: string;
  description?: string;
  referenceLink?: string;
  cloudinaryUrl: string;
  createdAt: string;
  tags?: Tag[];
};

export default function ArticleDetailClient() {
  const router = useRouter();
  const params = useParams();
  const documentId = params.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/documents/${documentId}`);
        if (!res.ok) throw new Error("Failed to fetch document");
        const data = await res.json();
        setDocument(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold text-red-600 dark:text-red-400">
          Document Not Found
        </h1>
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
    <section className="bg-sky-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10 p-6">

        {/* Title + Metadata */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-2">
          <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">
            {document.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
            <span className="flex items-center gap-1">
              <User size={16} /> {document.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {document.publishedYear}
            </span>
            {document.publisher && (
              <span className="flex items-center gap-1">
                <BookOpen size={16} /> {document.publisher}
              </span>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3 flex items-center gap-2">
            <Info size={20} /> Quick Stats
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-200">
            <li><strong>Created:</strong> {new Date(document.createdAt).toDateString()}</li>
            <li><strong>Pages:</strong> ~12 (sample)</li>
            <li><strong>Reading Time:</strong> ~15 mins</li>
            <li><strong>File Size:</strong> 2.4 MB (sample)</li>
          </ul>
        </section>

        {/* Description */}
        {document.description && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              {document.description}
            </p>
          </section>
        )}

        {/* Key Highlights */}
        <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
            Key Highlights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Summarizes malaria trends across multiple regions.</li>
            <li>Includes treatment guidelines with latest WHO updates.</li>
            <li>Provides case studies with statistical insights.</li>
            <li>References recent peer-reviewed publications.</li>
          </ul>
        </section>

        {/* Document Viewer + Actions */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
            Document
          </h2>
          <div className="w-full h-[600px] border rounded-lg overflow-hidden shadow">
            <iframe
              src={document.cloudinaryUrl}
              className="w-full h-full"
              title="Document Viewer"
            />
          </div>
          <button
            onClick={() => alert("Transcription feature coming soon 🚀")}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            Transcribe Document
          </button>
        </section>

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100 rounded-full text-sm flex items-center gap-1"
                >
                  <Tag size={14} /> {tag.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Citation Info */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
            Citation Info
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            {document.author}. ({document.publishedYear}). <em>{document.title}</em>. {document.publisher}.
          </p>
        </section>

        {/* Related Documents (Placeholder) */}
        <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
            Related Documents
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>Malaria Treatment Study (2021)</li>
            <li>Global Outbreak Trends (2020)</li>
            <li>WHO Health Guidelines (2022)</li>
          </ul>
        </section>

        {/* Reference */}
        {document.referenceLink && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Reference
            </h2>
            <a
              href={document.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <LinkIcon size={16} /> Visit Reference
            </a>
          </section>
        )}

        {/* Feedback */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Feedback
          </h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className="text-gray-400 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
          <textarea
            placeholder="Leave a comment..."
            className="mt-3 w-full border rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
            rows={3}
          />
          <button className="mt-2 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
            Submit Feedback
          </button>
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
