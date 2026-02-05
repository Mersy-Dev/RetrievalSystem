"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

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
  titleYo?: string;
  description?: string;
  descriptionYo?: string;
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
  const locale = useLocale();

  const [document, setDocument] = useState<Document | null>(null);

  const [translatedDoc, setTranslatedDoc] = useState<{
    id: string;
    fileUrl: string;
    translation?: string;
    signedUrl: string | undefined;
    translatedText?: string;
    translatedUrl?: string;
  } | null>(null);
  const [translating, setTranslating] = useState(false);

  const t = useTranslations("system"); // 👈 Use "Search" namespace (JSON below)

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

  const handleTranslate = async () => {
    try {
      setTranslating(true);
      const res = await fetch(`/api/documents/${documentId}/translated`);
      if (!res.ok) throw new Error("Failed to fetch translated document");
      const data = await res.json();
      console.log("🌍 Translated document:", data);
      setTranslatedDoc(data);
    } catch (error) {
      console.error("Error fetching translated document:", error);
      alert("Failed to load translated document.");
    } finally {
      setTranslating(false);
    }
  };

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
          {t("articles.documentNotFound ")}
        </h1>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          {t("articles.goBackButton")}
        </button>
      </div>
    );
  }

  return (
    <section className="bg-sky-100 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10 p-6">
        {/* Title + Metadata */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-2">
          <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">
            {locale === "yo"
              ? document.titleYo || document.title
              : document.title}
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
            <Info size={20} /> {t("articles.quickStats.title")}
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <strong>{t("articles.quickStats.fields.created")}:</strong>{" "}
              {new Date(document.createdAt).toDateString()}
            </li>
            <li>
              <strong>{t("articles.quickStats.fields.pages")}:</strong>{" "}
              {document.pages}
            </li>
            <li>
              <strong>{t("articles.quickStats.fields.readingTime")}:</strong>{" "}
              {document.readingTime}{" "}
              {document.readingTime === 1 ? "min" : "mins"}
            </li>

            <li>
              <strong>{t("articles.quickStats.fields.fileSize")}:</strong>{" "}
              {document.fileSize}
            </li>
          </ul>
        </section>

        {/* Description */}
        {(locale === "yo" ? document.descriptionYo : document.description) && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              {t("articles.description.title")}
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              {locale === "yo"
                ? document.descriptionYo || "Ko sí àlàyé tó wà nínú èdè Yorùbá."
                : document.description || "No description available."}
            </p>
          </section>
        )}

        {/* Document Preview */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-10">
          {/* Header */}
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-300 mb-4">
            {t("articles.preview.title")}
          </h2>

          {/* --- English Document Section --- */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300">
              {t("articles.preview.sections.english.title")}
            </h3>

            {document?.signedUrl ? (
              <div className="relative w-full h-[650px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                <iframe
                  src={document.signedUrl}
                  className="w-full h-full"
                  title={t(".preview.sections.english.title")}
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <a
                    href={document.signedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    {t("articles.preview.sections.english.openButton")}
                  </a>
                  <a
                    href={document.signedUrl}
                    download
                    className="px-3 py-1.5 text-xs font-medium bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition"
                  >
                    {t("articles.preview.sections.english.downloadButton")}
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p>{t("articles.preview.sections.english.privateText")}</p>
              </div>
            )}
          </div>

          {/* --- Yoruba Translation Section --- */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
              {t("articles.preview.sections.yoruba.title")}
            </h3>

            {/* ⚠️ Translation Notice */}
            <div className="flex gap-3 p-4 rounded-lg border border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 text-sm text-yellow-800 dark:text-yellow-200">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium">
                  {t("articles.preview.sections.yoruba.notice.title")}
                </p>

                <p>{t("articles.preview.sections.yoruba.notice.limit")}</p>

                <p>
                  {t("articles.preview.sections.yoruba.notice.alternative")}
                </p>
              </div>
            </div>

            {!translatedDoc ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <button
                  onClick={handleTranslate}
                  disabled={translating}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {translating
                    ? t("articles.preview.sections.yoruba.translatingText")
                    : t("articles.preview.sections.yoruba.translateButton")}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {t("articles.preview.sections.yoruba.clickInfo")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Yoruba Preview */}
                <div className="relative w-full h-[650px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                  <iframe
                    src={translatedDoc?.fileUrl || ""}
                    className="w-full h-full"
                    title={t("articles.preview.sections.yoruba.title")}
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <a
                      href={translatedDoc?.fileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      {t("articles.preview.sections.yoruba.openButton")}
                    </a>
                    <a
                      href={translatedDoc?.fileUrl || "#"}
                      download
                      className="px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                    >
                      {t("articles.preview.sections.yoruba.downloadButton")}
                    </a>
                  </div>
                </div>

                {/* Optional: Display Translated Text */}
                {translatedDoc?.translation && (
                  <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {translatedDoc.translation}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Tags */}
        {Array.isArray(document.tags) && document.tags.length > 0 && (
          <section className="bg-sky-50 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
              {t("articles.tags.title")}
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
        {Array.isArray(document.relatedDocs) &&
          document.relatedDocs.length > 0 && (
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-2">
                {t("articles.relatedDocs.title")}
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
              {t("articles.feedbacks.title")}
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
                      className={
                        i < fb.rating ? "text-yellow-400" : "text-gray-400"
                      }
                    />
                  ))}
                </div>
                {fb.comment && (
                  <p className="text-gray-700 dark:text-gray-200">
                    {fb.comment}
                  </p>
                )}
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
              {t("articles.reference.title")}
            </h2>
            <a
              href={document.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <LinkIcon size={16} /> {t("articles.reference.visitButton")}
            </a>
          </section>
        )}

        {/* Back to Search */}
        <div className="pt-4">
          <Link
            href="/system"
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium"
          >
            {t("articles.backToSearch.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
