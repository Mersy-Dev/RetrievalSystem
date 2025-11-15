"use client";
import { useState } from "react";
import Image from "next/image";
import dummyData from "@/components/data/malaria-knowledge.json";

type ChatWindowProps = {
  open: boolean;
  category: keyof typeof dummyData;
  onClose: () => void;
};

export default function ChatWindow({ open, category, onClose }: ChatWindowProps) {
  type Message = { sender: "user" | "bot"; text: string };

  const [messages, setMessages] = useState<Message[]>([]);

  if (!open) return null;

  const sendMessage = (text: string) => {
    if (!text) return;

    const userMsg: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    // Bot reply
    const reply = dummyData[category]?.response || "Sorry, I don't have info on that yet.";
    const botMsg: Message = { sender: "bot", text: reply };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 500); // slight delay for realistic feel
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>

      {/* Side Chat */}
      <div className="ml-auto relative z-50 w-full max-w-[400px] h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col">
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
            <span className="font-semibold text-lg">{category} Chat</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <Image
                  src="/images/Ag.png"
                  alt="Bot"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}

              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <Image
                  src="/images/Us.png"
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex p-4 border-t dark:border-gray-700 gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={send}
        className="bg-[#2E3094] text-white px-4 py-2 rounded-xl hover:bg-[#23267a]"
      >
        Send
      </button>
    </div>
  );
}
