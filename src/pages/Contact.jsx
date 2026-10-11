import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ReservationForm from '../components/ReservationForm';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please complete required fields.');
      return;
    }
    setContactSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="container">
        <SectionHeading
          eyebrow="REACH OUT TO US"
          title="Contact & Location"
          subtitle="We look forward to welcoming you to Maison Élan. Find our opening hours, contact details, or request a table reservation below."
        />

        {/* Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {/* Card 1: Address */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: '2.25rem 1.75rem',
              borderRadius: '4px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-cream)',
                color: 'var(--accent-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <MapPin size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Our Location
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Main Boulevard,
              <br />
              Karachi, Pakistan
            </p>
          </div>

          {/* Card 2: Hours */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: '2.25rem 1.75rem',
              borderRadius: '4px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-cream)',
                color: 'var(--accent-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Clock size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Opening Hours
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <strong>Mon – Thu:</strong> 11:00 AM – 11:00 PM
              <br />
              <strong>Fri – Sun:</strong> 11:00 AM – 12:00 AM
            </p>
          </div>

          {/* Card 3: Direct Contact */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: '2.25rem 1.75rem',
              borderRadius: '4px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-cream)',
                color: 'var(--accent-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Phone size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Direct Contact
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Phone: +92 300 1234567
              <br />
              Email: hello@maisonelan.com
            </p>
          </div>
        </div>

        {/* General Inquiry Form */}
        <div style={{ maxWidth: '800px', margin: '0 auto 5rem' }}>
          <SectionHeading
            eyebrow="SEND US A MESSAGE"
            title="General Inquiries"
            subtitle="Have a question about private events, catering, or dietary options? Send us a message."
          />

          {contactSubmitted ? (
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--accent-gold)',
                padding: '2.5rem',
                textAlign: 'center',
                borderRadius: '4px',
              }}
            >
              <CheckCircle2 size={36} color="var(--accent-burgundy)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                Merci for reaching out!
              </h4>
              <p style={{ color: 'var(--text-muted)' }}>
                We have received your message and will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                padding: '2.5rem 2rem',
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn-primary" style={{ minWidth: '220px' }}>
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Table Reservation Section */}
        <ReservationForm />
      </div>
    </div>
  );
};

export default Contact;
