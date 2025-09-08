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
      icon: <Thermometer className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('feverTitle'),
      desc: t('feverDesc'),
      details: t('feverDetails')
    },
    {
      key: 'sweating',
      icon: <Droplets className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('sweatingTitle'),
      desc: t('sweatingDesc'),
      details: t('sweatingDetails')
    },
    {
      key: 'fatigue',
      icon: <Activity className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('fatigueTitle'),
      desc: t('fatigueDesc'),
      details: t('fatigueDetails')
    },
    {
      key: 'chills',
      icon: <Bed className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('chillsTitle'),
      desc: t('chillsDesc'),
      details: t('chillsDetails')
    },
    {
      key: 'anemia',
      icon: <Heart className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('anemiaTitle'),
      desc: t('anemiaDesc'),
      details: t('anemiaDetails')
    },
    {
      key: 'other',
      icon: <AlertCircle className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-4" />,
      title: t('otherTitle'),
      desc: t('otherDesc'),
      details: t('otherDetails')
    }
  ]

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-green-50 dark:bg-gray-800 py-16 px-6 md:px-12 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Symptoms Grid */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
            {t('commonSymptoms')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {symptoms.map((symptom) => (
              <Dialog key={symptom.key}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer p-6 rounded-2xl shadow-md bg-sky-50 dark:bg-gray-800 flex flex-col items-center text-center hover:shadow-lg transition">
                    {symptom.icon}
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {symptom.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      {symptom.desc}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <DialogHeader>
                    <DialogTitle>{symptom.title}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
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
      <section className="bg-green-50 dark:bg-gray-800 py-16 px-6 md:px-12 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {t('detailsTitle')}
          </h2>
          <p>{t('details1')}</p>
          <p>{t('details2')}</p>
          <p>{t('details3')}</p>
        </div>
      </section>
    </main>
  )
}
