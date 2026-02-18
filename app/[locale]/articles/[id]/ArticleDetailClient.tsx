"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import parse from "html-react-parser";

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
  Download,
  ExternalLink,
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

type Tag = {
  id?: number;
  name: string;
};

type Feedback = {
  id: number;
  rating: number;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Yoruba reader state
  const [fontSize, setFontSize] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = useTranslations("system");

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

  const handleDownloadYoruba = () => {
    if (!translatedDoc?.fileUrl) return;

    // Create a download link
    const link = globalThis.document.createElement("a");
    link.href = translatedDoc.fileUrl;
    link.download = `${document?.title || "document"}_yoruba.pdf`;
    link.target = "_blank";
    globalThis.document.body.appendChild(link);
    link.click();
    globalThis.document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sky-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading document...
          </p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
            {t("articles.documentNotFound")}
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 transition"
          >
            {t("articles.goBackButton")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-300 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8 px-4">
        {/* Title + Metadata */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-sky-700 dark:text-sky-300 mb-4">
            {locale === "yo"
              ? document.titleYo || document.title
              : document.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-6">
            <span className="flex items-center gap-2">
              <User size={18} className="text-sky-500" />
              <strong>Author:</strong> {document.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-sky-500" />
              <strong>Published:</strong> {document.publishedYear}
            </span>
            {document.publisher && (
              <span className="flex items-center gap-2">
                <BookOpen size={18} className="text-sky-500" />
                <strong>Publisher:</strong> {document.publisher}
              </span>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-md border border-sky-100 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4 flex items-center gap-2">
            <Info size={22} /> {t("articles.quickStats.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("articles.quickStats.fields.created")}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {new Date(document.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("articles.quickStats.fields.pages")}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {document.pages || "N/A"}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("articles.quickStats.fields.readingTime")}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {document.readingTime} min
                {document.readingTime !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("articles.quickStats.fields.fileSize")}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {document.fileSize || "N/A"}
              </p>
            </div>
          </div>
        </section>

        {/* Description */}
        {(locale === "yo" ? document.descriptionYo : document.description) && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3 flex items-center gap-2">
              <FileText size={20} /> {t("articles.description.title")}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {locale === "yo"
                ? document.descriptionYo || "Ko sí àlàyé tó wà nínú èdè Yorùbá."
                : document.description || "No description available."}
            </p>
          </section>
        )}

        {/* Document Preview */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 space-y-8">
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-300 flex items-center gap-2">
            <BookOpen size={24} /> {t("articles.preview.title")}
          </h2>

          {/* --- English Document Section --- */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 space-y-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 flex items-center gap-2">
                <FileText size={20} />
                {t("articles.preview.sections.english.title")}
              </h3>
              {document?.signedUrl && (
                <div className="flex gap-2">
                  <a
                    href={document.signedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    {t("articles.preview.sections.english.openButton")}
                  </a>
                  <a
                    href={document.signedUrl}
                    download
                    className="px-4 py-2 text-sm font-medium bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition flex items-center gap-2"
                  >
                    <Download size={16} />
                    {t("articles.preview.sections.english.downloadButton")}
                  </a>
                </div>
              )}
            </div>

            {document?.signedUrl ? (
              <div className="relative w-full h-[700px] rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg">
                <iframe
                  src={document.signedUrl}
                  className="w-full h-full"
                  title={t("articles.preview.sections.english.title")}
                />
              </div>
            ) : (
              <div className="p-12 text-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">
                  {t("articles.preview.sections.english.privateText")}
                </p>
              </div>
            )}
          </div>

          {/* --- Yoruba Translation Section --- */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-6 space-y-4 border border-green-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                <FileText size={20} />
                {t("articles.preview.sections.yoruba.title")}
              </h3>
              {translatedDoc && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadYoruba}
                    className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              )}
            </div>

            {/* Translation Notice */}
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
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                  <BookOpen
                    size={48}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <button
                  onClick={handleTranslate}
                  disabled={translating}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-lg font-medium"
                >
                  {translating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("articles.preview.sections.yoruba.translatingText")}
                    </>
                  ) : (
                    <>
                      <FileText size={20} />
                      {t("articles.preview.sections.yoruba.translateButton")}
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
                  {t("articles.preview.sections.yoruba.clickInfo")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Yoruba Content Reader */}
                <div
                  className={`
                    bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-green-200 dark:border-gray-600 
                    transition-all duration-300
                    ${isFullscreen ? "fixed inset-4 z-50" : "relative"}
                  `}
                >
                  {/* Reader Controls */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Yoruba Translation
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Font Size Controls */}
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() =>
                            setFontSize(Math.max(12, fontSize - 2))
                          }
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                          title="Decrease font size"
                        >
                          <ZoomOut size={16} />
                        </button>
                        <span className="text-sm font-medium min-w-[3ch] text-center">
                          {fontSize}
                        </span>
                        <button
                          onClick={() =>
                            setFontSize(Math.min(24, fontSize + 2))
                          }
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                          title="Increase font size"
                        >
                          <ZoomIn size={16} />
                        </button>
                      </div>

                      {/* Fullscreen Toggle */}
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title={
                          isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                        }
                      >
                        <Maximize2 size={18} />
                      </button>

                      {/* Close Fullscreen */}
                      {isFullscreen && (
                        <button
                          onClick={() => setIsFullscreen(false)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reader Content */}
                  <div
                    className={`
                      overflow-y-auto bg-white dark:bg-gray-900 rounded-b-xl
                      ${isFullscreen ? "h-[calc(100%-60px)]" : "max-h-[600px]"}
                    `}
                  >
                    {translatedDoc?.translation ? (
                      <div
                        className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none
               prose-headings:font-bold 
               prose-h1:text-3xl prose-h1:mb-4 prose-h1:text-sky-700 dark:prose-h1:text-sky-300
               prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-sky-600 dark:prose-h2:text-sky-400
               prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4
               prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
               prose-table:w-full prose-table:border-collapse prose-table:my-6
               prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 
               prose-th:bg-sky-100 dark:prose-th:bg-sky-900/30 prose-th:p-3 prose-th:text-left
               prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 
               prose-td:p-3 prose-td:text-gray-700 dark:prose-td:text-gray-300"
                        style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
                      >
                        {parse(translatedDoc.translation)}
                      </div>
                    ) : (
                      <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        <FileText
                          size={48}
                          className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                        />
                        <p>No translated content available</p>
                        <p className="text-sm mt-2">
                          Please download the PDF to view the full translation
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alternative: Show download if no text content */}
                {!translatedDoc?.translation && translatedDoc?.fileUrl && (
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      The translated document is available as a PDF file
                    </p>
                    <button
                      onClick={handleDownloadYoruba}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2 mx-auto"
                    >
                      <Download size={20} />
                      Download Yoruba PDF
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Tags */}
        {Array.isArray(document.tags) && document.tags.length > 0 && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4 flex items-center gap-2">
              <TagIcon size={20} /> {t("articles.tags.title")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span
                  key={tag.id ?? tag.name}
                  className="px-4 py-2 bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition"
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
            <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4 flex items-center gap-2">
                <BookOpen size={20} /> {t("articles.relatedDocs.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {document.relatedDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/articles/${doc.id}`}
                    className="p-4 bg-sky-50 dark:bg-gray-700 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-600 transition border border-sky-100 dark:border-gray-600 group"
                  >
                    <h3 className="font-semibold text-sky-700 dark:text-sky-300 group-hover:underline mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Published: {doc.publishedYear}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        {/* Feedbacks */}
        {Array.isArray(document.feedbacks) && document.feedbacks.length > 0 && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4 flex items-center gap-2">
              <Star size={20} className="text-yellow-500" />{" "}
              {t("articles.feedbacks.title")}
            </h2>
            <div className="space-y-4">
              {document.feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < fb.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  {fb.comment && (
                    <p className="text-gray-700 dark:text-gray-200 mb-2">
                      {fb.comment}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reference */}
        {document.referenceLink && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3 flex items-center gap-2">
              <LinkIcon size={20} /> {t("articles.reference.title")}
            </h2>
            <a
              href={document.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              <ExternalLink size={16} /> {t("articles.reference.visitButton")}
            </a>
          </section>
        )}

        {/* Back to Search */}
        <div className="pt-4 text-center">
          <Link
            href="/system"
            className="inline-flex items-center gap-2 text-sky-700 dark:text-sky-400 hover:underline font-medium text-lg"
          >
            ← {t("articles.backToSearch.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
