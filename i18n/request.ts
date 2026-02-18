
import { getRequestConfig } from 'next-intl/server'
import { Locale, routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  let messages = {}

  try {
    const res = await fetch(`http://localhost:3001/api/translations/${locale}`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (res.ok) {
      messages = await res.json()
    } else {
      console.error(`Translation fetch failed for locale "${locale}": ${res.status}`)
    }
  } catch (error) {
    console.error(`Could not reach translation API for locale "${locale}":`, error)
  }

  return {
    locale,
    messages,
  }
})