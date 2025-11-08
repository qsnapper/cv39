import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import QuickFacts from '../components/QuickFacts'
import OwnerSaleBanner from '../components/OwnerSaleBanner'
import Overview from '../components/Overview'
import Gallery from '../components/Gallery'
import Features from '../components/Features'
import Location from '../components/Location'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { getPropertyContent } from '../lib/getContent'
import type { Locale } from '../i18n-config'

export default async function Home({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Fetch content from TinaCMS based on locale
  const content = await getPropertyContent(locale)

  return (
    <>
      <Navigation locale={locale} />
      <Hero data={content.hero} />
      <QuickFacts data={content.quickFacts} />
      <OwnerSaleBanner />
      <Overview data={content.overview} />
      <Gallery images={content.gallery} />
      <Features data={content.features} />
      <Location data={content.location} />
      <Contact data={content.contact} />
      <Footer />
    </>
  )
}
