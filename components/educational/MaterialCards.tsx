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
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {type} • {size}
        </span>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-indigo-600 hover:underline">
            <BookOpen className="w-4 h-4" /> {viewLabel}
          </button>
          <button className="flex items-center gap-1 text-green-600 hover:underline">
            <Download className="w-4 h-4" /> {downloadLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
