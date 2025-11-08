'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '../i18n-config'
import { i18n } from '../i18n-config'

const languageNames: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  fr: 'FR',
  de: 'DE',
  nl: 'NL',
}

export default function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  const redirectedPathname = (newLocale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">Colinas Verdes 39</div>
        <ul className="nav-menu">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact" className="btn-contact">Contact</a></li>
          <li className="language-switcher">
            {i18n.locales.map((loc) => (
              <Link
                key={loc}
                href={redirectedPathname(loc)}
                className={locale === loc ? 'active' : ''}
              >
                {languageNames[loc]}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}
