"use client";
import { MessageCircle } from "lucide-react";

export default function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open medical assistant"
      className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full shadow-2xl bg-[#0f4bd6] hover:bg-[#0b3bb8] text-white flex items-center justify-center"
    >
      <MessageCircle size={26} />
    </button>
  );
}
