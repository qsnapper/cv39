import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET - Read content file
export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  try {
    const { locale } = params
    const filePath = path.join(process.cwd(), 'content', 'property', `${locale}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Content file not found' },
        { status: 404 }
      )
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(content)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Failed to read content file' },
      { status: 500 }
    )
  }
}

// POST - Save content file
export async function POST(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  try {
    const { locale } = params
    const data = await request.json()

    // Validate locale
    const validLocales = ['en', 'pt', 'fr', 'de', 'nl']
    if (!validLocales.includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale' },
        { status: 400 }
      )
    }

    // Validate that data has required structure
    if (!data.locale || !data.hero || !data.quickFacts) {
      return NextResponse.json(
        { error: 'Invalid content structure' },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), 'content', 'property', `${locale}.json`)

    // Write the file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

    return NextResponse.json({ success: true, message: 'Content saved successfully' })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content file' },
      { status: 500 }
    )
  }
}
