"use client";

import { FileText, Download, BookOpen } from "lucide-react";

interface MaterialCardProps {
  title: string;
  description: string;
  type: string;
  size: string;
  author: string;
  publishedYear: number;
  publisher?: string;
  tags?: string[];
  viewLabel: string;
  downloadLabel: string;
  onView: () => void;
}

export default function MaterialCard({
  title,
  description,
  type,
  size,
  author,
  publishedYear,
  publisher,
  tags,
  viewLabel,
  downloadLabel,
  onView,
}: MaterialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl dark:hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-xl">
          <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>

      {/* Summary & Metadata */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 space-y-1">
        <p>{description}</p>
        <p>
          <span className="font-medium">Author:</span> {author} • <span className="font-medium">Year:</span> {publishedYear}
        </p>
        {publisher && (
          <p>
            <span className="font-medium">Publisher:</span> {publisher}
          </p>
        )}
        {tags && tags.length > 0 && (
          <p>
            <span className="font-medium">Tags:</span> {tags.join(", ")}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          {type} • {size}
        </span>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            onClick={onView}
          >
            <BookOpen className="w-4 h-4" /> {viewLabel}
          </button>
          <button className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:underline">
            <Download className="w-4 h-4" /> {downloadLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
