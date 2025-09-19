"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const MalariaFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations(); // ✅ get translation function

  // ✅ Build faq items using full backend keys
  const faqItems = [
    {
      question: t("home.faq.items.0.question") || "What is malaria?",
      answer: t("home.faq.items.0.answer") || "Malaria is a life-threatening disease caused by parasites transmitted through the bites of infected mosquitoes.",
    },
    {
      question: t("home.faq.items.1.question") || "How is malaria transmitted?",
      answer: t("home.faq.items.1.answer") || "It is transmitted when an infected female Anopheles mosquito bites a person.",
    },
    {
      question: t("home.faq.items.2.question") || "What are the symptoms of malaria?",
      answer: t("home.faq.items.2.answer") || "Common symptoms include fever, chills, headache, nausea, and fatigue.",
    },
    {
      question: t("home.faq.items.3.question") || "How can malaria be prevented?",
      answer: t("home.faq.items.3.answer") || "Using insecticide-treated nets, indoor spraying, and preventive medication can help reduce malaria transmission.",
    },
  ];

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-12 md:py-20 transition-colors duration-300">
      <div className="w-full md:w-3/4 mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-16 border border-sky-100 dark:border-gray-700 transition-colors duration-300">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-300">
            {t("home.faq.title") || "Frequently Asked Questions"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t("home.faq.subtitle") || "Learn more about malaria prevention and treatment."}
          </p>
        </div>

        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-sky-800 dark:text-sky-300 font-medium text-base flex justify-between items-center"
              >
                {item.question}
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MalariaFAQ;
