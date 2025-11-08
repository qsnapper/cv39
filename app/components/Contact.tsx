'use client'

import { useState } from 'react'

export default function Contact() {
  const [formMessage, setFormMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      })

      if (response.ok) {
        setFormMessage('Thank you for your inquiry! We will get back to you soon.')
        form.reset()
      } else {
        setFormMessage('Something went wrong. Please try again or contact us directly.')
      }
    } catch (error) {
      setFormMessage('Something went wrong. Please try again or contact us directly.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Speak Directly with the Owner</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Get authentic insights and arrange your private viewing directly</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="owner-contact-badge">
              <svg className="owner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Direct Owner Contact</span>
            </div>

            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Phone:</strong>
                <a href="tel:+351917566931">+351 917 566 931</a>
              </div>
              <div className="contact-item">
                <strong>Reference:</strong>
                CV39 - Colinas Verdes Villa
              </div>
            </div>

            <div className="contact-cta">
              <h4>Why Buy Direct?</h4>
              <ul>
                <li>Save on agent commission fees</li>
                <li>Get first-hand property knowledge</li>
                <li>Flexible viewing schedules</li>
                <li>Direct negotiation & faster decisions</li>
                <li>Personal insights about the property & area</li>
                <li>Negotiable price - open to reasonable offers</li>
                <li>Option to purchase partially furnished</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              id="contactForm"
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Send Inquiry
              </button>
              {formMessage && <div className="form-message">{formMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
