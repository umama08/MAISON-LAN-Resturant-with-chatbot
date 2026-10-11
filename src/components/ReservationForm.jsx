import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    specialRequest: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      alert('Please complete all required fields.');
      return;
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '19:00',
      guests: '2',
      specialRequest: '',
    });
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionHeading
          eyebrow="RESERVATIONS"
          title="Votre Table Vous Attend."
          subtitle="Make an evening of it. Join us for an intimate bistro dinner or morning coffee in Karachi."
        />

        {submitted ? (
          <div
            style={{
              backgroundColor: 'var(--bg-ivory)',
              border: '1px solid var(--accent-gold)',
              padding: '3rem 2rem',
              textAlign: 'center',
              borderRadius: '4px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--accent-gold)',
              }}
            >
              <CheckCircle size={32} />
            </div>

            <h3 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Merci! Your reservation request has been received.
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              We have noted your request for <strong>{formData.guests} guests</strong> on{' '}
              <strong>{formData.date || 'your selected date'}</strong> at <strong>{formData.time}</strong>.
              Our maître d' will review your details and send a confirmation email shortly.
            </p>

            <button onClick={resetForm} className="btn-secondary">
              Make Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              padding: '2.5rem 2rem',
              borderRadius: '4px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Full Name */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jean Dupont"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Date *
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Time *
                </label>
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="18:00">06:00 PM (Dinner)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Guests *
                </label>
                <div style={{ position: 'relative' }}>
                  <Users size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6+">6+ Large Group</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Request */}
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  color: 'var(--text-main)',
                }}
              >
                Special Requests or Dietary Requirements
              </label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={16} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-light)' }} />
                <textarea
                  name="specialRequest"
                  rows={3}
                  value={formData.specialRequest}
                  onChange={handleChange}
                  placeholder="Anniversary, birthday, quiet corner table, allergies..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', maxWidth: '320px', padding: '1rem' }}>
                Request a Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ReservationForm;
