"use client";
import Image from "next/image";

type ChatAssistantProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (topic: string) => void;
};

export default function ChatAssistant({ open, onClose, onSelect }: ChatAssistantProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>

      {/* Side drawer */}
      <div className="ml-auto relative z-50 w-full max-w-[380px] h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Image
              src="/doctor-avatar.png"
              alt="Doctor"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-lg">Chat with Doctor</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Message / Instruction */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-gray-600 mb-4">
            Hello! How can I help you with malaria today? Please select a topic:
          </p>

          {/* Categories */}
          <div className="grid grid-cols-1 gap-3">
            {[
              "Symptoms",
              "Prevention",
              "Treatment",
              "Pregnancy",
              "Children",
              "Environment",
              "Causes",
              "Others",
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 bg-blue-50 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                onClick={() => onSelect(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
