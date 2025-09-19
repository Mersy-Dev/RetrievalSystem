"use client";

import React, { createContext, useContext, useState } from "react";

interface TranslationContextProps {
  locale: string;
  messages: Record<string, string>;
  setLang: (locale: string) => void;
  setMessages: (messages: Record<string, string>) => void;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

interface TranslationProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

export const TranslationProvider = ({
  children,
  locale: initialLocale,
  messages: initialMessages,
}: TranslationProviderProps) => {

// console.log("🟢 Initial locale from backend:", initialLocale);
//   console.log("🟢 Initial messages from backend:", initialMessages);    
  const [locale, setLang] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);

  return (
    <TranslationContext.Provider value={{ locale, messages, setLang, setMessages }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  // translation function
  const t = (key: string) => context.messages[key] || key;

  console.log("Current locale:", context.locale);
  console.log("Current messages:", context.messages);
    console.log("Translation function output for 'example.key':", t("example.key"));

  return { t, locale: context.locale, setLang: context.setLang,
    setMessages: context.setMessages };
};


