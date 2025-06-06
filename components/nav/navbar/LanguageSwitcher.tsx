'use client'

import { locales } from '@/locales'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LanguageSwitcher = ({ closeMenu }: { closeMenu?: () => void }) => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('LanguageSwitcher')

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  // Load stored locale on mount
  useEffect(() => {
    const storedLocale = localStorage.getItem('selectedLocale')
    if (storedLocale && storedLocale !== locale) {
      changeLanguage(storedLocale) // Sync the stored locale
    }
  }, []) // Run only once on mount

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return // Prevent redundant updates

    // Store new locale in localStorage
    localStorage.setItem('selectedLocale', newLocale)

    // Remove existing locale from the path
    const segments = pathname.split('/').filter((seg) => !locales.includes(seg))

    // Construct the new path correctly
    const newPath = `/${newLocale}/${segments.join('/')}`.replace(/\/+/g, '/') 

    router.replace(newPath)
    setDropdownOpen(false)

    if (closeMenu) closeMenu()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 rounded-md flex items-center gap-2 transition-all"
        aria-label="Change Language"
      >
        {t('currentLanguage', { lang: locale.toUpperCase() })}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-28 bg-white shadow-lg rounded-md z-30 overflow-hidden border border-gray-200">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-300 transition-all"
            >
              {t(lang)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
