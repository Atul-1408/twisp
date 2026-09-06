import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import AbstractEmerald3D from './3d/AbstractEmerald3D';
import { leadService } from '../services/leadService';

export default function ContactSection({ prefilledService, onLeadCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    website: '',
    service: prefilledService || 'New Website Design & Build',
    budget: '$1,000–$2,500',
    timeline: '1–2 Months',
    message: '',
    honeypot: '', // Spam protection
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const budgetOptions = [
    'Under $500',
    '$500–$1,000',
    '$1,000–$2,500',
    '$2,500+',
  ];

  const timelineOptions = [
    'Under 2 Weeks',
    '1 Month',
    '1–2 Months',
    'Flexible',
  ];

  const serviceOptions = [
    'New Website Design & Build',
    'Website Redesign & Modernization',
    'Custom Web Development',
    'E-commerce Storefront',
    'UI/UX & Design Systems',
    'SEO & Conversion Optimization',
    'Full Digital Strategy'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please share a few details about your project goals';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters to help us understand your needs';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      console.warn('Spam submission detected.');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await leadService.submitLead({
        name: formData.name,
        business: formData.business,
        company: formData.business,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        honeypot: formData.honeypot,
      });

      if (result && result.success) {
        setSubmittedLead(result.data || {
          id: 'lead-' + Date.now().toString().slice(-6),
          name: formData.name,
          business: formData.business || 'Undisclosed Client',
          company: formData.business || 'Undisclosed Client',
          service: formData.service,
          budget: formData.budget,
        });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#B8F2D5', '#087F5B', '#FFFFFF'],
          });
        } catch (err) {
          // ignore
        }

        if (onLeadCreated) onLeadCreated(result.data);

        // Reset form data after successful submission
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          website: '',
          service: 'New Website Design & Build',
          budget: '$1,000–$2,500',
          timeline: '1–2 Months',
          message: '',
          honeypot: '',
        });
        setErrors({});
      } else {
        setSubmitError(result?.message || 'Unable to submit your request. Please try again.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      setSubmitError(err.message || 'Unable to submit your request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setSubmitError('');
    setFormData({
      name: '',
      business: '',
      email: '',
      phone: '',
      website: '',
      service: 'New Website Design & Build',
      budget: '$1,000–$2,500',
      timeline: '1–2 Months',
      message: '',
      honeypot: '',
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      style={{
        padding: '120px 0',
        backgroundColor: '#041A13',
        backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(8, 127, 91, 0.25) 0%, rgba(3, 19, 14, 1) 80%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top CTA Banner Grid */}
        <div className="contact-cta-banner" style={{ marginBottom: '64px' }}>
          <div style={{ maxWidth: '640px' }}>
            <div className="section-label">GET IN TOUCH</div>
            <h2
              className="section-title light"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                marginBottom: '16px',
              }}
            >
              Ready to create <br />
              something great?
            </h2>
            <p
              className="section-subtitle light"
              style={{
                marginBottom: '28px',
                fontSize: '1.15rem',
              }}
            >
              Let's discuss your project and turn your ideas into a powerful online presence. We reply within 24 business hours with a clear scope and quote.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(6, 40, 30, 0.6)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                fontSize: '0.875rem',
                color: '#B8F2D5',
              }}
            >
              <ShieldCheck size={18} color="#10B981" />
              <span>Direct communication • No automated outsourcing • Fixed estimates</span>
            </div>
          </div>

          {/* Right 3D Abstract Object */}
          <div className="contact-3d-wrapper">
            <AbstractEmerald3D />
          </div>
        </div>

        {/* The Quote Request Form Box */}
        <div
          id="quote-form-container"
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            backgroundColor: 'rgba(6, 40, 30, 0.7)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {submittedLead ? (
            /* SUCCESS CONFIRMATION STATE */
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                animation: 'fadeIn 0.3s ease-in-out',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <CheckCircle2 size={36} color="#10B981" />
              </div>

              <h3
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                }}
              >
                Quote Request Received!
              </h3>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#CBD5E1',
                  maxWidth: '520px',
                  margin: '0 auto 24px',
                  lineHeight: 1.6,
                }}
              >
                Thank you, <strong style={{ color: '#FFFFFF' }}>{submittedLead.name}</strong>. We've recorded your project requirements for{' '}
                <strong style={{ color: '#10B981' }}>{submittedLead.business}</strong>.
              </p>

              {/* Lead Reference Card */}
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(3, 19, 14, 0.8)',
                  border: '1px dashed rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '16px 28px',
                  marginBottom: '32px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#9CA3AF' }}>
                  REFERENCE ID: <span style={{ color: '#B8F2D5', fontWeight: 600 }}>{submittedLead.id}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#E5E7EB', marginTop: '4px' }}>
                  Service: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{submittedLead.service}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#E5E7EB', marginTop: '2px' }}>
                  Budget Tier: <span style={{ color: '#10B981', fontWeight: 600 }}>{submittedLead.budget}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.875rem', padding: '10px 22px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM STATE */
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    marginBottom: '8px',
                  }}
                >
                  Request a Free Project Quote
                </h3>
                <p style={{ fontSize: '0.925rem', color: '#94A3B8' }}>
                  Tell us what you're building. We'll analyze your goals and provide an honest proposal.
                </p>
              </div>

              {/* Honeypot Field (Invisible to real users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="hp_field">Do not fill this</label>
                <input
                  id="hp_field"
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Grid Inputs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="twisp-input"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F87171', fontSize: '0.75rem', marginTop: '5px' }}>
                      <AlertCircle size={13} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label
                    htmlFor="contact-business"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Business Name
                  </label>
                  <input
                    id="contact-business"
                    type="text"
                    placeholder="e.g. Morgan Dynamics"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="twisp-input"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="twisp-input"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F87171', fontSize: '0.75rem', marginTop: '5px' }}>
                      <AlertCircle size={13} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Phone <span style={{ color: '#94A3B8' }}>(Optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="twisp-input"
                  />
                </div>
              </div>

              {/* Website URL & Service Needed */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr)))',
                  gap: '20px',
                  marginBottom: '24px',
                }}
              >
                {/* Existing Website */}
                <div>
                  <label
                    htmlFor="contact-website"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Current Website <span style={{ color: '#94A3B8' }}>(Optional)</span>
                  </label>
                  <input
                    id="contact-website"
                    type="url"
                    placeholder="https://yourcurrentsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="twisp-input"
                  />
                </div>

                {/* What do you need? */}
                <div>
                  <label
                    htmlFor="contact-service"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#B8F2D5',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    What do you need? *
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="twisp-input"
                    style={{ cursor: 'pointer' }}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: '#06281E', color: '#FFFFFF' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Options Buttons */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#B8F2D5',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Estimated Project Budget *
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: formData.budget === b ? '1.5px solid #10B981' : '1px solid rgba(16, 185, 129, 0.2)',
                        backgroundColor: formData.budget === b ? 'rgba(16, 185, 129, 0.18)' : 'rgba(4, 26, 19, 0.6)',
                        color: formData.budget === b ? '#FFFFFF' : '#CBD5E1',
                        fontSize: '0.875rem',
                        fontWeight: formData.budget === b ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        textAlign: 'center',
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Timeline Buttons */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#B8F2D5',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Target Launch Timeline
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: formData.timeline === t ? '1.5px solid #10B981' : '1px solid rgba(16, 185, 129, 0.2)',
                        backgroundColor: formData.timeline === t ? 'rgba(16, 185, 129, 0.18)' : 'rgba(4, 26, 19, 0.6)',
                        color: formData.timeline === t ? '#FFFFFF' : '#CBD5E1',
                        fontSize: '0.8125rem',
                        fontWeight: formData.timeline === t ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        textAlign: 'center',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Details */}
              <div style={{ marginBottom: '32px' }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#B8F2D5',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Project Scope & Goals *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Describe your project, target audience, timeline, or any specific inspirations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="twisp-input"
                  style={{ resize: 'vertical' }}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F87171', fontSize: '0.75rem', marginTop: '5px' }}>
                    <AlertCircle size={13} />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {submitError && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#FCA5A5',
                    fontSize: '0.875rem',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    padding: '15px 36px',
                    fontSize: '1rem',
                    opacity: isSubmitting ? 0.75 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request a Free Quote</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                  🔒 No obligation. 100% confidential.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-cta-banner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (min-width: 992px) {
          .contact-cta-banner {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 48px;
          }
        }
        .contact-3d-wrapper {
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .twisp-input {
          width: 100%;
          padding: 13px 16px;
          background-color: rgba(4, 26, 19, 0.75);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 0.9375rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .twisp-input:focus {
          outline: none;
          border-color: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }
        .twisp-input::placeholder {
          color: #64748B;
        }
      `}</style>
    </section>
  );
}
