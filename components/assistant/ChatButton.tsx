"use client";
import { MessageCircle } from "lucide-react";

export default function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[#2E3094] hover:bg-[#23267a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition"
    >
      <MessageCircle size={28} />
    </button>
  );
}
