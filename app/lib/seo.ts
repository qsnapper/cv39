import type { Locale } from '../i18n-config'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export function generateStructuredData(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: locale === 'pt' ? 'Vila de Campo Requintada' : 'Exquisite Countryside Villa',
    description: locale === 'pt'
      ? 'Moradia de luxo T4 com piscina em Colinas Verdes, Lagos, Portugal - €1.045.000. Propriedade deslumbrante no campo com jardins maduros, sauna e ginásio.'
      : 'Luxury 4-bedroom villa with pool in Colinas Verdes, Lagos, Portugal - €1,045,000. Stunning countryside property with mature gardens, sauna, and gym.',
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/images/pool.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Colinas Verdes',
      addressLocality: 'Bensafrim, Lagos',
      addressRegion: 'Algarve',
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.1385,
      longitude: -8.6958
    },
    offers: {
      '@type': 'Offer',
      price: '1045000',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    numberOfRooms: 4,
    numberOfBathroomsTotal: 4,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: 298,
      unitCode: 'MTK'
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: '10x5m' },
      { '@type': 'LocationFeatureSpecification', name: 'Garden', value: '2,064m²' },
      { '@type': 'LocationFeatureSpecification', name: 'Sauna' },
      { '@type': 'LocationFeatureSpecification', name: 'Gym' },
      { '@type': 'LocationFeatureSpecification', name: 'Home Office' },
      { '@type': 'LocationFeatureSpecification', name: 'Solar Panels' }
    ]
  }
}

export function generateMetadata(locale: Locale) {
  const titles: Record<Locale, string> = {
    en: 'Luxury Villa for Sale - Colinas Verdes, Lagos, Portugal | €1,045,000',
    pt: 'Moradia de Luxo à Venda - Colinas Verdes, Lagos, Portugal | €1.045.000',
    fr: 'Villa de Luxe à Vendre - Colinas Verdes, Lagos, Portugal | €1,045,000',
    de: 'Luxusvilla zu Verkaufen - Colinas Verdes, Lagos, Portugal | €1.045.000',
    nl: 'Luxe Villa te Koop - Colinas Verdes, Lagos, Portugal | €1.045.000'
  }

  const descriptions: Record<Locale, string> = {
    en: 'Luxury 4-bedroom villa with pool in Colinas Verdes, Lagos, Portugal - €1,045,000. Stunning countryside property with mature gardens, sauna, and gym.',
    pt: 'Moradia de luxo T4 com piscina em Colinas Verdes, Lagos, Portugal - €1.045.000. Propriedade deslumbrante no campo com jardins maduros, sauna e ginásio.',
    fr: 'Villa de luxe 4 chambres avec piscine à Colinas Verdes, Lagos, Portugal - €1,045,000. Superbe propriété de campagne avec jardins matures, sauna et gym.',
    de: 'Luxusvilla mit 4 Schlafzimmern und Pool in Colinas Verdes, Lagos, Portugal - €1.045.000. Atemberaubendes Landhaus mit reifen Gärten, Sauna und Fitnessraum.',
    nl: 'Luxe villa met 4 slaapkamers en zwembad in Colinas Verdes, Lagos, Portugal - €1.045.000. Prachtig landgoed met volgroeide tuinen, sauna en sportschool.'
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: 'luxury villa, Lagos, Portugal, Algarve, property for sale, swimming pool, Colinas Verdes, real estate',
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${siteUrl}/${locale}`,
      siteName: 'Colinas Verdes 39',
      images: [
        {
          url: `${siteUrl}/images/pool.jpg`,
          width: 1200,
          height: 630,
          alt: 'Luxury Villa with Pool in Lagos, Portugal'
        }
      ],
      locale: locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`${siteUrl}/images/pool.jpg`]
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        pt: `${siteUrl}/pt`,
        fr: `${siteUrl}/fr`,
        de: `${siteUrl}/de`,
        nl: `${siteUrl}/nl`
      }
    }
  }
}
