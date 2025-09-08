"use client";

import { FileText, Download, BookOpen } from "lucide-react";

interface MaterialCardProps {
  title: string;
  description: string;
  type: string;
  size: string;
  viewLabel: string;
  downloadLabel: string;
}

export default function MaterialCard({
  title,
  description,
  type,
  size,
  viewLabel,
  downloadLabel,
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

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          {type} • {size}
        </span>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline">
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
