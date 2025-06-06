"use client";

import React, { useState } from "react";

const faqData = [
  {
    question: "What is the Malaria Intelligence Assistant?",
    answer:
      "The Malaria Intelligence Assistant is an AI-powered platform designed to help users search, explore, and retrieve detailed insights about malaria-related topics including symptoms, treatments, outbreaks, and research studies.",
  },
  {
    question: "How do I use the assistant?",
    answer:
      "Simply enter your question or keywords in the search bar, and the system will return curated results from research papers, medical databases, and trusted health sources.",
  },
  {
    question: "Can I trust the results?",
    answer:
      "Yes. The assistant retrieves data from verified sources such as WHO, PubMed, and malaria-specific case reports. It is built to prioritize credible, human-reviewed information.",
  },
  {
    question: "Who can use this assistant?",
    answer:
      "It is designed for students, researchers, health workers, and the general public interested in understanding malaria-related information more deeply.",
  },
  {
    question: "Is this system able to detect malaria symptoms?",
    answer:
      "The system cannot diagnose diseases but can provide information about common symptoms, trends, and research related to malaria. Always consult a healthcare provider for medical concerns.",
  },
];

const MalariaFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
   <section className="bg-sky-50 py-12 md:py-20">
       <div className="w-full md:w-3/4 mx-auto bg-white shadow-xl rounded-2xl p-8 mb-16 border border-sky-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-sky-700">FAQs about Malaria Intelligence Assistant</h2>
        <p className="text-sm text-gray-600 mt-2">
          Everything you need to know about how the system works and how to get the best from it.
        </p>
      </div>

      <div className="space-y-5">
        {faqData.map((item, index) => (
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
