"use client";

import React from "react";
import FeatureCard from "./FeatureCard";
import { useTranslations } from "next-intl";

const FeatureGrid = () => {
  const t = useTranslations();

  // ✅ Build features manually using backend keys
  const features = [
    {
      title: t("home.features.items.0.title") || "Search Malaria Data",
      description:
        t("home.features.items.0.description") ||
        "Easily search through malaria statistics, reports, and prevention strategies.",
      cta: t("home.features.items.0.cta") || "Start Searching",
    },
    {
      title: t("home.features.items.1.title") || "Real-time Insights",
      description:
        t("home.features.items.1.description") ||
        "Stay updated with live malaria outbreak reports and case tracking.",
      cta: t("home.features.items.1.cta") || "View Insights",
    },
    {
      title: t("home.features.items.2.title") || "Learn & Prevent",
      description:
        t("home.features.items.2.description") ||
        "Access tutorials, prevention tips, and expert advice on malaria control.",
      cta: t("home.features.items.2.cta") || "Learn More",
    },
    {
      title: t("home.features.items.3.title") || "Community Support",
      description:
        t("home.features.items.3.description") ||
        "Connect with local organizations and communities for malaria support.",
      cta: t("home.features.items.3.cta") || "Get Involved",
    },
    {
      title: t("home.features.items.4.title") || "Health Worker Tools",
      description:
        t("home.features.items.4.description") ||
        "Specialized resources and data access for healthcare professionals.",
      cta: t("home.features.items.4.cta") || "Explore Tools",
    },
    {
      title: t("home.features.items.5.title") || "Multilingual Access",
      description:
        t("home.features.items.5.description") ||
        "Access malaria resources in multiple languages to reach diverse communities.",
      cta: t("home.features.items.5.cta") || "Explore Languages",
    },
  ];

  return (
   <section className=" dark:bg-cyan-900 px-6 py-12 md:py-20 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        {t("home.features.title") || "Our Features"}
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            cta={feature.cta}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
