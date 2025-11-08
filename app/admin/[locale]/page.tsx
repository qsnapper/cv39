'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Locale = 'en' | 'pt' | 'fr' | 'de' | 'nl'

const localeNames: Record<Locale, string> = {
  en: 'English 🇬🇧',
  pt: 'Portuguese 🇵🇹',
  fr: 'French 🇫🇷',
  de: 'German 🇩🇪',
  nl: 'Dutch 🇳🇱',
}

export default function EditorPage({ params }: { params: { locale: Locale } }) {
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    loadContent()
  }, [params.locale])

  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content/${params.locale}`)
      if (response.ok) {
        const data = await response.json()
        const formatted = JSON.stringify(data, null, 2)
        setContent(formatted)
        setOriginalContent(formatted)
      } else {
        setError(`Content file not found for ${params.locale}`)
      }
    } catch (err) {
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    try {
      setSaving(true)
      setMessage('')
      setError('')

      // Validate JSON
      const parsed = JSON.parse(content)

      const response = await fetch(`/api/content/${params.locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })

      if (response.ok) {
        setMessage('✅ Content saved successfully!')
        setOriginalContent(content)
        setTimeout(() => setMessage(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save content')
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('❌ Invalid JSON format. Please fix the syntax errors.')
      } else {
        setError('❌ Failed to save content')
      }
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = content !== originalContent

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading content...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div>
            <Link
              href="/admin"
              style={{
                color: '#666',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              ← Back to Content List
            </Link>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1a2332' }}>
              Editing: {localeNames[params.locale]}
            </h1>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              content/property/{params.locale}.json
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {hasChanges && (
              <span style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600' }}>
                ● Unsaved changes
              </span>
            )}
            <button
              onClick={saveContent}
              disabled={saving || !hasChanges}
              style={{
                background: hasChanges ? '#c9a961' : '#ccc',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '600',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #10b981',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            color: '#065f46'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #ef4444',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            color: '#991b1b'
          }}>
            {error}
          </div>
        )}

        {/* Editor */}
        <div style={{
          background: 'white',
          padding: '0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#f3f4f6',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>
              JSON Editor
            </span>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Edit the JSON content below
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              height: 'calc(100vh - 300px)',
              minHeight: '500px',
              padding: '1.5rem',
              border: 'none',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              resize: 'vertical',
              outline: 'none'
            }}
            spellCheck={false}
          />
        </div>

        {/* Tips */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
            💡 Editing Tips
          </h3>
          <ul style={{ marginLeft: '1.5rem', color: '#666', lineHeight: '1.8', fontSize: '0.9rem' }}>
            <li>Make sure the JSON is valid before saving</li>
            <li>Use proper quotes and commas</li>
            <li>Arrays use square brackets: [ ]</li>
            <li>Objects use curly braces: {'{ }'}</li>
            <li>Preview your changes at: <code>/{params.locale}</code></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
