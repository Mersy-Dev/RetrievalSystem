"use client";

import { useTranslations } from "next-intl";
import { Stethoscope, Pill, Hospital, Home } from "lucide-react";

export default function TreatmentPage() {
  const t = useTranslations("Treatment");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("intro")}
        </p>
      </section>

      {/* Sections Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Diagnosis */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Stethoscope className="w-6 h-6 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-semibold">{t("diagnosis.title")}</h2>
          </div>
          <p className="text-gray-700">{t("diagnosis.description")}</p>
        </div>

        {/* Medications */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold">{t("medications.title")}</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
            <li>{t("medications.item1")}</li>
            <li>{t("medications.item2")}</li>
            <li>{t("medications.item3")}</li>
          </ul>
        </div>

        {/* Severe Malaria Treatment */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Hospital className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold">{t("severe.title")}</h2>
          </div>
          <p className="text-gray-700">{t("severe.description")}</p>
        </div>

        {/* Home Care & Recovery */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Home className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-semibold">{t("homeCare.title")}</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
            <li>{t("homeCare.item1")}</li>
            <li>{t("homeCare.item2")}</li>
            <li>{t("homeCare.item3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
