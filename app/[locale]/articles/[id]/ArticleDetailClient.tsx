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
  Tag as TagIcon,
  Info,
  Star,
} from "lucide-react";

type Tag = {
  id?: number;
  name: string;
};

type Feedback = {
  id: number;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
};

type Document = {
  id: string;
  title: string;
  description?: string;
  author: string;
  publishedYear: number;
  publisher?: string;
  referenceLink?: string;
  storageUrl: string;
  signedUrl?: string;
  pages?: number;
  readingTime?: number;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  relatedDocs?: Document[];
  relatedByDocuments?: Document[];
  feedbacks?: Feedback[];
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
        const data: Document = await res.json();
        console.log("📄 Document:", data);
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
            <li>
              <strong>Created:</strong>{" "}
              {new Date(document.createdAt).toDateString()}
            </li>
            <li>
              <strong>Pages:</strong> {document.pages ?? "N/A"}
            </li>
            <li>
              <strong>Reading Time:</strong> {document.readingTime ?? "N/A"} mins
            </li>
            <li>
              <strong>File Size:</strong> {document.fileSize ?? "N/A"} MB
            </li>
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

        {/* Document Preview */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4">
            Document Preview
          </h2>
          {document.signedUrl ? (
            <div className="relative w-full h-[700px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-50 dark:bg-gray-900">
              <iframe
                src={document.signedUrl}
                className="w-full h-full"
                title="Document Viewer"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100/90 dark:from-gray-900/90 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-3 flex gap-2 z-20">
                <a
                  href={document.signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  Open
                </a>
                <a
                  href={document.signedUrl}
                  download
                  className="px-3 py-1.5 text-xs font-medium bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p>📄 This document is private, unavailable, or expired.</p>
            </div>
          )}
        </section>

        {/* Tags */}
        {Array.isArray(document.tags) && document.tags.length > 0 && (
          <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span
                  key={tag.id ?? tag.name}
                  className="px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100 rounded-full text-sm flex items-center gap-1"
                >
                  <TagIcon size={14} /> {tag.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related Documents */}
        {Array.isArray(document.relatedDocs) && document.relatedDocs.length > 0 && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              Related Documents
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              {document.relatedDocs.map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/articles/${doc.id}`}
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    {doc.title} ({doc.publishedYear})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Feedbacks */}
        {Array.isArray(document.feedbacks) && document.feedbacks.length > 0 && (
          <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
              Feedbacks
            </h2>
            {document.feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="border-b border-gray-200 dark:border-gray-700 py-2"
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < fb.rating ? "text-yellow-400" : "text-gray-400"}
                    />
                  ))}
                </div>
                {fb.comment && <p className="text-gray-700 dark:text-gray-200">{fb.comment}</p>}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </section>
        )}

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
