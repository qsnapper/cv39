import { MetadataRoute } from 'next'
import { i18n } from './i18n-config'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate sitemap entries for all locales
  const localePages = i18n.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === i18n.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map(loc => [loc, `${baseUrl}/${loc}`])
      )
    }
  }))

  return localePages
}
