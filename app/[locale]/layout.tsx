import type { Metadata } from 'next'
import '../globals.css'
import type { Locale } from '../i18n-config'
import { generateMetadata as getSEOMetadata, generateStructuredData } from '../lib/seo'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  return getSEOMetadata(locale)
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const structuredData = generateStructuredData(locale)

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
