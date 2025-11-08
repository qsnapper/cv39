import type { Metadata } from 'next'
import '../globals.css'
import type { Locale } from '../i18n-config'

export const metadata: Metadata = {
  title: 'Luxury Villa for Sale - Colinas Verdes, Lagos, Portugal | €1,045,000',
  description: 'Luxury 4-bedroom villa with pool in Colinas Verdes, Lagos, Portugal - €1,045,000. Stunning countryside property with mature gardens, sauna, and gym.',
  keywords: 'luxury villa, Lagos, Portugal, Algarve, property for sale, swimming pool, Colinas Verdes',
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
