'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ContentFile = {
  locale: string
  path: string
}

const files: ContentFile[] = [
  { locale: 'English', path: 'en' },
  { locale: 'Portuguese', path: 'pt' },
  { locale: 'French', path: 'fr' },
  { locale: 'German (Ready)', path: 'de' },
  { locale: 'Dutch (Ready)', path: 'nl' },
]

export default function AdminPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1a2332',
            marginBottom: '0.5rem'
          }}>
            Content Management
          </h1>
          <p style={{ color: '#666' }}>
            Edit your property listing content in different languages
          </p>
        </div>

        {/* Instructions */}
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#856404' }}>
            📝 How to Edit Content
          </h2>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8', color: '#856404' }}>
            <li>Click on a language file below to edit</li>
            <li>Modify the content in the editor</li>
            <li>Click "Save Changes" to update the file</li>
            <li>Refresh your site to see the changes</li>
          </ol>
        </div>

        {/* Content Files Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {files.map((file) => (
            <Link
              key={file.path}
              href={`/admin/${file.path}`}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {file.path === 'en' && '🇬🇧'}
                {file.path === 'pt' && '🇵🇹'}
                {file.path === 'fr' && '🇫🇷'}
                {file.path === 'de' && '🇩🇪'}
                {file.path === 'nl' && '🇳🇱'}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {file.locale}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Edit content/{file.path}.json
              </p>
              <div style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#c9a961',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Edit Content →
              </div>
            </Link>
          ))}
        </div>

        {/* Alternative Options */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginTop: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
            Alternative: Direct File Editing
          </h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            You can also edit content files directly in your code editor:
          </p>
          <ul style={{ marginLeft: '1.5rem', color: '#666', lineHeight: '1.8' }}>
            <li><code>content/property/en.json</code> - English</li>
            <li><code>content/property/pt.json</code> - Portuguese</li>
            <li><code>content/property/fr.json</code> - French</li>
          </ul>
          <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
            Changes will appear immediately with Next.js hot reload when running dev server.
          </p>
        </div>
      </div>
    </div>
  )
}
