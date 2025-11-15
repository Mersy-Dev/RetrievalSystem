"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import {
  Upload,
  FileText,
  Tag,
  User,
  Calendar,
  BookOpen,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

const TAG_OPTIONS = [
  "🧬 Malaria Symptoms",
  "💊 Treatment Guidelines",
  "🌍 Regional Outbreaks",
  "📚 Latest Research",
  "📈 Case Studies",
  "🛡️ Preventive Measures",
];

function UploadDocumentContent() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [titleYo, setTitleYo] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionYo, setDescriptionYo] = useState("");
  const [author, setAuthor] = useState("");
  const [authorYo, setAuthorYo] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning("📂 Please select a file to upload.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("titleYo", titleYo);
      formData.append("description", description);
      formData.append("descriptionYo", descriptionYo);
      formData.append("author", author);
      formData.append("authorYo", authorYo);
      formData.append("publishedYear", publishedYear);
      formData.append("publisher", publisher);
      formData.append("referenceLink", referenceLink);
      formData.append("document", file);
      formData.append("tags", JSON.stringify(selectedTags));

      // ✅ Backend now calculates pages, readingTime, fileSize, storageUrl, signedUrl
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      toast.success("🎉 Your document has been uploaded successfully!");

      setTimeout(() => {
        router.push("/dashboard/documents");
      }, 1500);

      // reset form
      setTitle("");
      setDescription("");
      setAuthor("");
      setPublishedYear("");
      setPublisher("");
      setReferenceLink("");
      setFile(null);
      setSelectedTags([]);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`❌ Upload failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="ml-3 text-lg">Loading page...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-indigo-500" />
        <h1 className="text-2xl font-bold">Upload Document</h1>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
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
        <div>
          <label className="block text-sm font-medium mb-2">Title (Yoruba)</label>
          <input
            type="text"
            placeholder="Enter document title in Yoruba"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={titleYo}
            onChange={(e) => setTitleYo(e.target.value)}
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-2">Author (Yoruba)</label>
          <input
            type="text"
            placeholder="Enter author name(s) in Yoruba"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            value={authorYo}
            onChange={(e) => setAuthorYo(e.target.value)}
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

         <div>
          <label className="block text-sm font-medium mb-2">Description (Yoruba)</label>
          <textarea
            placeholder="Enter short description in Yoruba"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-900"
            rows={3}
            value={descriptionYo}
            onChange={(e) => setDescriptionYo(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload File</label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-indigo-500">
            <Upload className="w-8 h-8 mb-2 text-indigo-500" />
            <p className="text-sm">Click to select file (PDF, DOC, etc.)</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="mt-2 cursor-pointer text-indigo-600 hover:underline"
            >
              {file ? file.name : "Choose File"}
            </label>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-500" /> Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  selectedTags.includes(tag)
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
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
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function UploadDocumentPage() {
  return (
    <Provider store={store}>
      <UploadDocumentContent />
    </Provider>
  );
}
