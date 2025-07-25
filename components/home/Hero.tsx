'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from 'next/image';

const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="bg-white py-16 mt-2 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            {t("title") || "Smarter Malaria Awareness Starts Here"}
          </h1>
          <p className="text-lg text-gray-600">
            {t("description") ||
              "Empowering health workers, students, and communities with intelligent malaria data retrieval and insights."}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-sky-600 text-white py-2 px-4 rounded hover:bg-sky-700 transition"
            >
              {t("cta") || "Join the Fight Against Malaria"}
            </Link>
            <Link
              href="/system"
              className="border border-sky-600 text-sky-600 py-2 px-4 rounded hover:bg-sky-50 transition"
            >
              {t("cta2") || "Explore Malaria Data"}
            </Link>
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5 mt-4 space-y-1">
            <li>{t("feature1") || "Access comprehensive malaria data"}</li>
            <li>{t("feature2") || "Get real-time updates on outbreaks"}</li>
            <li>{t("feature3") || "Learn about prevention and treatment"}</li>
            <li>{t("feature4") || "Engage with community health workers"}</li>
          </ul>
        </div>

        {/* Right Full Image Section */}
        <div className="md:w-1/2 w-full h-[400px] md:h-[500px] relative rounded-2xl shadow-2xl overflow-hidden">
          <Image
            src="/images/malaria/circle.jpg"
            alt={t('imageAlt') || "Illustration of malaria system"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
