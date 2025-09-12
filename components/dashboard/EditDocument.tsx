"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FileText,
  User,
  Calendar,
  BookOpen,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

export default function EditDocumentPage() {
  const { id } = useParams(); // ✅ Get document ID from URL
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [referenceLink, setReferenceLink] = useState("");

  // ✅ Page loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Fetch single document
  useEffect(() => {
    async function fetchDoc() {
      try {
        const res = await fetch(`/api/documents/${id}`);
        if (!res.ok) throw new Error("Failed to fetch document");
        const data = await res.json();

        setTitle(data.title || "");
        setDescription(data.description || "");
        setAuthor(data.author || "");
        setPublishedYear(data.publishedYear?.toString() || "");
        setPublisher(data.publisher || "");
        setReferenceLink(data.referenceLink || "");
      } catch {
        toast.error("❌ Failed to load document");
      }
    }
    if (id) fetchDoc();
  }, [id]);

  // ✅ Update document
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          author,
          publishedYear,
          publisher,
          referenceLink,
        }),
      });

      if (!res.ok) throw new Error("Failed to update document");

      toast.success("✅ Document updated successfully!");

      // Redirect back
      setTimeout(() => {
        router.push("/dashboard/documents");
      }, 1500);
    } catch {
      toast.error("❌ Failed to update document");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="ml-3 text-lg">Loading document...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-indigo-500" />
        <h1 className="text-2xl font-bold">Edit Document</h1>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter document title"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <User className="w-4 h-4 text-indigo-500" /> Author(s)
          </label>
          <input
            type="text"
            placeholder="Enter author name(s)"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Published Year */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-indigo-500" /> Published Year
          </label>
          <input
            type="number"
            placeholder="e.g. 2023"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-indigo-500" /> Publisher / Source
          </label>
          <input
            type="text"
            placeholder="Enter publisher or source"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        {/* Reference Link */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
            <LinkIcon className="w-4 h-4 text-indigo-500" /> Reference Link
            (optional)
          </label>
          <input
            type="url"
            placeholder="Enter DOI or reference link"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Enter short description"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
