'use client'

import { useTranslations } from 'next-intl'
import {
  AlertCircle,
  Activity,
  Thermometer,
  Droplets,
  Bed,
  Heart
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'

export default function SymptomsPage() {
  const t = useTranslations('Symptoms')

  // All symptom cards data
  const symptoms = [
    {
      key: 'fever',
      icon: <Thermometer className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('feverTitle'),
      desc: t('feverDesc'),
      details: t('feverDetails')
    },
    {
      key: 'sweating',
      icon: <Droplets className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('sweatingTitle'),
      desc: t('sweatingDesc'),
      details: t('sweatingDetails')
    },
    {
      key: 'fatigue',
      icon: <Activity className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('fatigueTitle'),
      desc: t('fatigueDesc'),
      details: t('fatigueDetails')
    },
    {
      key: 'chills',
      icon: <Bed className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('chillsTitle'),
      desc: t('chillsDesc'),
      details: t('chillsDetails')
    },
    {
      key: 'anemia',
      icon: <Heart className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('anemiaTitle'),
      desc: t('anemiaDesc'),
      details: t('anemiaDetails')
    },
    {
      key: 'other',
      icon: <AlertCircle className="w-10 h-10 text-sky-600 mb-4" />,
      title: t('otherTitle'),
      desc: t('otherDesc'),
      details: t('otherDetails')
    }
  ]

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Symptoms Grid */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            {t('commonSymptoms')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {symptoms.map((symptom) => (
              <Dialog key={symptom.key}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer p-6 rounded-2xl shadow-md bg-sky-50 flex flex-col items-center text-center hover:shadow-lg transition">
                    {symptom.icon}
                    <h3 className="font-semibold text-lg">{symptom.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {symptom.desc}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{symptom.title}</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      {symptom.details}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="bg-green-50 py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">{t('detailsTitle')}</h2>
          <p>{t('details1')}</p>
          <p>{t('details2')}</p>
          <p>{t('details3')}</p>
        </div>
      </section>
    </main>
  )
}
