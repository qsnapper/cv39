import fs from 'fs'
import path from 'path'

export type PropertyContent = {
  locale: string
  hero: {
    title: string
    subtitle: string
    price: string
    backgroundImage: string
  }
  quickFacts: {
    bedrooms: number
    bathrooms: number
    builtArea: string
    plotSize: string
    poolSize: string
  }
  overview: {
    heading: string
    leadParagraph: string
    description: string
    highlights: string[]
  }
  gallery: Array<{
    src: string
    alt: string
    category: string
  }>
  features: {
    interior: {
      heading: string
      items: string[]
    }
    outdoor: {
      heading: string
      items: string[]
    }
    amenities: {
      heading: string
      items: string[]
    }
    lifestyle: {
      heading: string
      items: string[]
    }
  }
  location: {
    heading: string
    address: string
    description: string
    latitude: number
    longitude: number
    highlights: string[]
  }
  contact: {
    phone: string
    reference: string
    benefits: string[]
  }
}

export async function getPropertyContent(locale: string = 'en'): Promise<PropertyContent> {
  const filePath = path.join(process.cwd(), 'content', 'property', `${locale}.json`)

  // Try to load locale-specific file, fallback to English if not found
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    const fallbackPath = path.join(process.cwd(), 'content', 'property', 'en.json')
    const fileContents = fs.readFileSync(fallbackPath, 'utf8')
    return JSON.parse(fileContents)
  }
}
