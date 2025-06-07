"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const MalariaFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations("home.faq");

  const faqItems = t.raw("items") as { question: string; answer: string }[];

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-sky-50 py-12 md:py-20">
      <div className="w-full md:w-3/4 mx-auto bg-white shadow-xl rounded-2xl p-8 mb-16 border border-sky-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-sky-700">{t("title")}</h2>
          <p className="text-sm text-gray-600 mt-2">{t("subtitle")}</p>
        </div>

        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-sky-800 font-medium text-base flex justify-between items-center"
              >
                {item.question}
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MalariaFAQ;