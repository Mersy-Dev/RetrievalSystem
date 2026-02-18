"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Upload,
  FileText,
  Tag,
  User,
  Calendar,
  BookOpen,
  Link as LinkIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useUser } from "@/redux/user/hooks/useUser";

const TAG_OPTIONS = [
  "🧬 Malaria Symptoms",
  "💊 Treatment Guidelines",
  "🌍 Regional Outbreaks",
  "📚 Latest Research",
  "📈 Case Studies",
  "🛡️ Preventive Measures",
];

export default function UploadDocumentPage() {
  console.log('🚀 UPLOAD PAGE COMPONENT LOADED');
  
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user, isAuthenticated, loading: authLoading } = useUser();
  
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

  // ✅ REMOVED - This was causing the redirect loop
  // useEffect(() => {
  //   if (!authLoading && !isAuthenticated) {
  //     router.push(`/${locale}/auth/login`);
  //   }
  // }, [authLoading, isAuthenticated, router, locale]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.warning("📝 Please enter a document title");
      return false;
    }
    if (!author.trim()) {
      toast.warning("👤 Please enter the author name");
      return false;
    }
    if (!publishedYear) {
      toast.warning("📅 Please enter the published year");
      return false;
    }
    if (!file) {
      toast.warning("📂 Please select a file to upload");
      return false;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.warning("📄 Please upload a PDF or Word document only");
      return false;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.warning("📦 File size must be less than 10MB");
      return false;
    }

    const year = parseInt(publishedYear);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      toast.warning(`📅 Published year must be between 1900 and ${currentYear}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("titleYo", titleYo.trim());
      formData.append("description", description.trim());
      formData.append("descriptionYo", descriptionYo.trim());
      formData.append("author", author.trim());
      formData.append("authorYo", authorYo.trim());
      formData.append("publishedYear", publishedYear);
      formData.append("publisher", publisher.trim());
      formData.append("referenceLink", referenceLink.trim());
      formData.append("document", file!);
      formData.append("tags", JSON.stringify(selectedTags));

      // const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        // headers: {
        //   ...(token && { Authorization: `Bearer ${token}` }),
        // },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Upload failed");
      }

      toast.success("🎉 Document uploaded successfully!");

      setTitle("");
      setTitleYo("");
      setDescription("");
      setDescriptionYo("");
      setAuthor("");
      setAuthorYo("");
      setPublishedYear("");
      setPublisher("");
      setReferenceLink("");
      setFile(null);
      setSelectedTags([]);

      setTimeout(() => {
        router.push(`/${locale}/dashboard/documents`);
      }, 1500);

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(`❌ Upload failed: ${message}`);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.warning("📄 Please upload a PDF or Word document only");
        e.target.value = "";
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        toast.warning("📦 File size must be less than 10MB");
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
    }
  };

  console.log('Upload page state:', { authLoading, isAuthenticated, user });

  // ✅ Simplified loading check
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="ml-3 text-lg text-gray-900 dark:text-white">Loading...</span>
      </div>
    );
  }

  // ✅ Show login message if not authenticated, but don't redirect
  // (Let dashboard layout handle auth, since we're inside it)
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Authentication Required
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please log in to upload documents
        </p>
        <button
          onClick={() => router.push(`/${locale}/auth/login`)}
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const isEmailVerified = user?.isEmailVerified ?? true;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-green-600">✅ UPLOAD PAGE IS RENDERING!</h1>
      
      {/* Email Verification Warning */}
      {!isEmailVerified && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Email Verification Required
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                You can upload documents, but some features may be limited until you verify your email.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-indigo-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Upload Document
        </h1>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 space-y-6"
      >
        {/* Title (English) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter document title"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Title (Yoruba) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Title (Yoruba)
          </label>
          <input
            type="text"
            placeholder="Enter document title in Yoruba"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={titleYo}
            onChange={(e) => setTitleYo(e.target.value)}
          />
        </div>

        {/* Author (English) */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 text-indigo-500" /> 
            Author(s) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter author name(s)"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Author (Yoruba) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Author (Yoruba)
          </label>
          <input
            type="text"
            placeholder="Enter author name(s) in Yoruba"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={authorYo}
            onChange={(e) => setAuthorYo(e.target.value)}
          />
        </div>

        {/* Published Year */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-indigo-500" /> 
            Published Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 2023"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <BookOpen className="w-4 h-4 text-indigo-500" /> Publisher / Source
          </label>
          <input
            type="text"
            placeholder="Enter publisher or source"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        {/* Reference Link */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <LinkIcon className="w-4 h-4 text-indigo-500" /> 
            Reference Link (optional)
          </label>
          <input
            type="url"
            placeholder="Enter DOI or reference link"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
          />
        </div>

        {/* Description (English) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Enter short description"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Description (Yoruba) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description (Yoruba)
          </label>
          <textarea
            placeholder="Enter short description in Yoruba"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            rows={3}
            value={descriptionYo}
            onChange={(e) => setDescriptionYo(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Upload File <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
            <Upload className="w-8 h-8 mb-2 text-indigo-500" />
            <p className="text-sm mb-1">Click to select file (PDF or Word document)</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Maximum file size: 10MB</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleFileChange}
              id="fileInput"
              required
            />
            <label
              htmlFor="fileInput"
              className="mt-2 cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              {file ? `📄 ${file.name}` : "Choose File"}
            </label>
            {file && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
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

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/${locale}/dashboard/documents`)}
            disabled={loading}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
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
              "Upload Document"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}