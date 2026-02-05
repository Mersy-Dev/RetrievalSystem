"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import tree from "@/components/data/malaria-knowledge.json";

type StepText = { en: string; yo: string };

type Step = {
  id: string;
  question: StepText;
  options: Record<string, StepText>;
  next?: Record<string, string>;
  result?: StepText | string;
  results?: Record<string, StepText | string>;
};

const typedTree: Record<string, Step> = tree as unknown as Record<string, Step>;

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  lang: "en" | "yo"; // store the language
  meta?: string;
  ts: number;
};

export default function ChatDrawer({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: "en" | "yo";
}) {
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (open) {
      startStep("root");
    } else {
      setCurrentStepId(null);
      setMessages([]);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // push bot message respecting the language
  function pushBotMessage(stepText: StepText | string) {
    const text =
      typeof stepText === "string" ? stepText : stepText[lang] || stepText.en;

    const msg: Message = {
      id: `bot-${Date.now()}-${Math.random()}`,
      sender: "bot",
      text,
      lang,
      ts: Date.now(),
    };
    setMessages((m) => [...m, msg]);
  }

  function pushUserMessage(stepText: StepText | string, meta?: string) {
    const text =
      typeof stepText === "string" ? stepText : stepText[lang] || stepText.en;

    const msg: Message = {
      id: `user-${Date.now()}-${Math.random()}`,
      sender: "user",
      text,
      lang,
      meta,
      ts: Date.now(),
    };
    setMessages((m) => [...m, msg]);
  }

  if (!open) return null;
  const currentStep: Step | undefined = currentStepId
    ? typedTree[currentStepId]
    : undefined;

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <aside className="ml-auto relative z-[90] w-full max-w-[420px] h-screen bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Image
              src="/images/doc.jpg"
              alt="Doctor"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold text-lg">
                {lang === "yo" ? "Oluranlọwọ Ilera" : "Health Assistant"}
              </div>
              <div className="text-sm text-gray-500">
                {lang === "yo"
                  ? "Alaye ati itọsọna nipa malaria"
                  : "Malaria information & guidance"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([]);
                setCurrentStepId(null);
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 px-2"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="px-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  {lang === "yo"
                    ? "Bawo! Mo le ran ọ lọwọ pẹlu alaye malaria. Tẹ aṣayan kan lati bẹrẹ."
                    : "Hi! I can help you with malaria information. Tap an option to begin."}
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "bot" && (
                <div className="flex items-start gap-2">
                  <Image
                    src="/images/bott.jpg"
                    alt="Bot"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-2xl shadow-sm max-w-[75%]">
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              )}

              {m.sender === "user" && (
                <div className="flex items-end gap-2">
                  <div className="bg-[#0f4bd6] text-white p-3 rounded-2xl shadow-sm max-w-[75%] text-sm">
                    <div className="font-medium">{m.text}</div>
                  </div>
                  <Image
                    src="/images/users.jpg"
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex justify-start items-center gap-2">
              <Image
                src="/images/bottt.jpg"
                alt="Bot"
                width={28}
                height={28}
                className="rounded-full"
              />
              <div className="bg-white dark:bg-gray-800 p-2 rounded-xl">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce inline-block"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce inline-block delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce inline-block delay-150"></span>
                </div>
              </div>
            </div>
          )}

          {/* Current step */}
          {currentStep && (
            <div className="pt-2">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm">
                <div className="text-sm mb-2 font-medium">
                  {currentStep.question[lang]}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(currentStep.options).map(
                    ([letter, label]) => (
                      <button
                        key={letter}
                        onClick={() => handleOptionSelect(letter)}
                        className="text-left w-full px-3 py-2 rounded-lg bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition flex items-center gap-3"
                      >
                        <span className="min-w-[34px] inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-[#0f4bd6] font-semibold border border-[#0f4bd6]">
                          {letter}
                        </span>
                        <div>
                          <div className="text-sm font-medium">
                            {label[lang]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {lang === "yo" ? "Tẹ lati yan" : "Tap to choose"}
                          </div>
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Select options (A, B, C...) — no typing required
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMessages([]);
                  startRoot();
                }}
                className="px-3 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-800"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );

  // helpers
  function startRoot() {
    setMessages([]);
    setCurrentStepId(null);
    setTimeout(() => startStep("root"), 150);
  }

  function startStep(stepId: string) {
    const step: Step | undefined = typedTree[stepId];
    if (!step) return;
    setCurrentStepId(stepId);
    setTimeout(() => {
      pushBotMessage(step.question);
    }, 120);
  }

  function handleOptionSelect(letter: string) {
    const step: Step | undefined = currentStepId
      ? typedTree[currentStepId]
      : undefined;
    if (!step) return;
    const optionText = step.options[letter];
    if (!optionText) return;

    pushUserMessage(`${letter} — ${optionText[lang]}`, letter);

    const nextId = step.next ? step.next[letter] : undefined;

    if (nextId) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        startStep(nextId);
      }, 500);
      return;
    } else {
      const result = step.results?.[letter] ?? step.result;
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        if (typeof result === "string" && result) {
          pushBotMessage(result);
        } else if (result && typeof result === "object") {
          pushBotMessage(result);
        } else {
          pushBotMessage(
            lang === "yo"
              ? "Ko si alaye siwaju sii fun aṣayan yẹn."
              : "No further information available for that option.",
          );
        }
      }, 500);
    }
  }
}
