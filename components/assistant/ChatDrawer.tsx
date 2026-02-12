
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, RotateCcw, CheckCircle2, AlertCircle, Info } from "lucide-react";
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
  lang: "en" | "yo";
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
  const [isVisible, setIsVisible] = useState(false);

  // Smooth visibility animation
  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const pushBotMessage = useCallback((stepText: StepText | string) => {
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
  }, [lang]);

  const pushUserMessage = useCallback((stepText: StepText | string, meta?: string) => {
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
  }, [lang]);

  const startStep = useCallback((stepId: string) => {
    const step: Step | undefined = typedTree[stepId];
    if (!step) return;
    setCurrentStepId(stepId);
    setTimeout(() => {
      pushBotMessage(step.question);
    }, 150);
  }, [pushBotMessage]);

  const startRoot = useCallback(() => {
    setMessages([]);
    setCurrentStepId(null);
    setTimeout(() => startStep("root"), 200);
  }, [startStep]);

  const handleOptionSelect = useCallback((letter: string) => {
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
      }, 600);
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
      }, 600);
    }
  }, [currentStepId, lang, pushUserMessage, pushBotMessage, startStep]);

  useEffect(() => {
    if (open) {
      startStep("root");
    } else {
      setCurrentStepId(null);
      setMessages([]);
    }
  }, [open, startStep]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  if (!open) return null;
  
  const currentStep: Step | undefined = currentStepId
    ? typedTree[currentStepId]
    : undefined;

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden">
      {/* Enhanced backdrop with blur */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm
                   transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose} 
      />

      {/* Main drawer */}
      <aside 
        className={`ml-auto relative z-[90] w-full max-w-[440px] h-screen 
                   bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 
                   shadow-2xl flex flex-col transform transition-all duration-500 ease-out
                   ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        {/* Professional Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                        px-5 py-4 shadow-lg border-b-2 border-blue-800/50">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/doc.jpg"
                  alt="Health Assistant"
                  width={52}
                  height={52}
                  className="rounded-full border-3 border-white/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full 
                               border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <div className="font-bold text-lg text-white tracking-tight">
                 {lang === "en" ? " Malaria Health Assistant" : "Oluranlọwọ Ilera Malaria"}
                </div>
                <div className="text-xs text-blue-100 font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  {lang === "yo" ? "Ṣiṣẹ bayi" : "Online now"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([]);
                setCurrentStepId(null);
                onClose();
              }}
              className="text-white/80 hover:text-white hover:bg-white/10 
                       p-2 rounded-xl transition-all duration-200 
                       active:scale-95"
              aria-label="Close chat"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#bfdbfe transparent'
          }}
        >
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="opacity-0 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                             p-5 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-600 p-2 rounded-xl shadow-md">
                    <Info size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {lang === "yo" ? "Kaabo!" : "Welcome!"}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {lang === "yo"
                        ? "Mo le ran ọ lọwọ pẹlu alaye malaria. Tẹ aṣayan kan lati bẹrẹ."
                        : "I'm here to provide you with accurate malaria information. Select an option below to begin."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex opacity-0 animate-slide-in ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "bot" && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <Image
                    src="/images/bott.jpg"
                    alt="Assistant"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-blue-100 dark:border-gray-700 shadow-sm flex-shrink-0"
                  />
                  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                                 px-4 py-3 rounded-2xl rounded-tl-sm shadow-md 
                                 border border-gray-100 dark:border-gray-700">
                    <div className="text-sm leading-relaxed">{m.text}</div>
                  </div>
                </div>
              )}

              {m.sender === "user" && (
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white 
                                 px-4 py-3 rounded-2xl rounded-br-sm shadow-md">
                    <div className="text-sm font-medium leading-relaxed">{m.text}</div>
                  </div>
                  <Image
                    src="/images/users.jpg"
                    alt="You"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-blue-200 dark:border-gray-700 shadow-sm flex-shrink-0"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="flex justify-start items-center gap-2 opacity-0 animate-fade-in">
              <Image
                src="/images/bottt.jpg"
                alt="Assistant typing"
                width={32}
                height={32}
                className="rounded-full border-2 border-blue-100 dark:border-gray-700 shadow-sm"
              />
              <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl rounded-tl-sm shadow-md 
                             border border-gray-100 dark:border-gray-700">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Current Step Options */}
          {currentStep && (
            <div className="pt-3 opacity-0 animate-slide-up">
              <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-900 
                             p-4 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-700">
                <div className="text-sm mb-4 font-semibold text-gray-800 dark:text-gray-100 
                               flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                  {currentStep.question[lang]}
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {Object.entries(currentStep.options).map(([letter, label]) => (
                    <button
                      key={letter}
                      onClick={() => handleOptionSelect(letter)}
                      className="group text-left w-full px-4 py-3.5 rounded-xl 
                               bg-white dark:bg-gray-800 
                               hover:bg-blue-50 dark:hover:bg-gray-700
                               border-2 border-gray-200 dark:border-gray-700
                               hover:border-blue-400 dark:hover:border-blue-500
                               transition-all duration-200 
                               shadow-sm hover:shadow-md
                               transform hover:scale-[1.02] active:scale-[0.98]
                               flex items-center gap-3"
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center 
                                     h-9 w-9 rounded-full 
                                     bg-gradient-to-br from-blue-600 to-indigo-600 
                                     text-white font-bold text-sm shadow-md
                                     group-hover:from-blue-700 group-hover:to-indigo-700
                                     transition-all duration-200">
                        {letter}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100 
                                       group-hover:text-blue-700 dark:group-hover:text-blue-300
                                       transition-colors duration-200">
                          {label[lang]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Footer */}
        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 
                        border-t-2 border-gray-200 dark:border-gray-800 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <AlertCircle size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>
                {lang === "yo" 
                  ? "Yan awọn aṣayan (A, B, C...)" 
                  : "Select options (A, B, C...)"}
              </span>
            </div>
            <button
              onClick={startRoot}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                       bg-white dark:bg-gray-800 
                       text-blue-700 dark:text-blue-300
                       border-2 border-blue-200 dark:border-gray-700
                       hover:bg-blue-50 dark:hover:bg-gray-700
                       hover:border-blue-400 dark:hover:border-blue-500
                       shadow-sm hover:shadow-md
                       transition-all duration-200
                       active:scale-95"
            >
              <RotateCcw size={14} />
              <span>{lang === "yo" ? "Tun bẹrẹ" : "Restart"}</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}