import Navigation from './components/Navigation'
import Hero from './components/Hero'
import QuickFacts from './components/QuickFacts'
import OwnerSaleBanner from './components/OwnerSaleBanner'
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import Features from './components/Features'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <QuickFacts />
      <OwnerSaleBanner />
      <Overview />
      <Gallery />
      <Features />
      <Location />
      <Contact />
      <Footer />
    </>
  )
}
