import React from 'react';
import FeatureCard from './FeatureCard';
import { useTranslations } from "next-intl";

const FeatureGrid = () => {
  const t = useTranslations("home.features");

  // Get translated features
  const features = t.raw("items") as {
    title: string;
    description: string;
    cta: string;
  }[];

  return (
    <section className=" px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        {t("title")}
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
