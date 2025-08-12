'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function HeroSection() {
  const t = useTranslations('about.AboutSection')

  return (
    <section className="bg-sky-50 min-h-[90vh] w-full flex items-center">
      <div className="mx-auto max-w-[1200px] px-5 flex flex-col md:flex-row items-center w-full">
        <div className="md:w-1/2 max-w-[560px] mt-20 mb-8 md:mb-0">
          <Image
            src="/images/malaria/moscrim.jpg"
            alt={t('imageAlt')}
            width={420}
            height={260}
            className="rounded-md shadow-md"
          />
        </div>

        <div className="md:w-1/2 text-center md:rtl:text-right ltr:text-left px-4 lg:px-0 max-w-[550px]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg font-light text-gray-700 leading-relaxed">
            {t('introMala')}
          </p>
        </div>
      </div>
    </section>
  )
}
