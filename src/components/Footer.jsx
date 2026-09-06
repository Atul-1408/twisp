import React from 'react';
import { ArrowUpRight, Lock, Shield } from 'lucide-react';

export default function Footer({ onOpenAdmin, onOpenQuoteModal, onOpenPrivacy, onOpenTerms }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#020F0B',
        color: '#FFFFFF',
        paddingTop: '80px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(16, 185, 129, 0.12)',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/assets/twisp-logo-white.png"
                alt="TWISP"
                style={{
                  height: '32px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
              <span
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--twisp-emerald-400)',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                STUDIO
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              Digital design & development studio crafting high-performance websites for ambitious businesses and modern brands.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#10B981',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(6, 40, 30, 0.6)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              Accepting Select Q2 & Q3 Projects
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                color: '#10B981',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Home', target: '#hero' },
                { name: 'Services', target: '#services' },
                { name: 'Selected Work', target: '#work' },
                { name: 'Why TWISP', target: '#why-twisp' },
                { name: 'Our Process', target: '#process' },
                { name: 'Request Quote', target: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.target}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.target);
                    }}
                    style={{
                      color: '#CBD5E1',
                      fontSize: '0.875rem',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#10B981')}
                    onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                color: '#10B981',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Website Design & UI/UX',
                'Custom Web Development',
                'E-commerce Solutions',
                'Design Systems Architecture',
                'SEO & Technical Foundations',
                'Conversion Optimization',
              ].map((service) => (
                <li key={service}>
                  <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                color: '#10B981',
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Contact & Social
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>DIRECT EMAIL</div>
                <a
                  href="mailto:twispstudio@gmail.com"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#10B981')}
                  onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                >
                  twispstudio@gmail.com
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>STUDIO HOURS</div>
                <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Mon – Fri, 9:00am – 6:00pm EST</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {['LinkedIn', 'Instagram'].map((soc) => (
                <span
                  key={soc}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#10B981';
                    e.target.style.backgroundColor = 'rgba(16,185,129,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9CA3AF';
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {soc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.8125rem',
            color: '#6B7280',
          }}
        >
          <div>
            © 2026 TWISP Studio. All rights reserved. Built with precision and care.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={onOpenPrivacy}
              style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 'inherit' }}
              onMouseEnter={(e) => (e.target.style.color = '#B8F2D5')}
              onMouseLeave={(e) => (e.target.style.color = '#6B7280')}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 'inherit' }}
              onMouseEnter={(e) => (e.target.style.color = '#B8F2D5')}
              onMouseLeave={(e) => (e.target.style.color = '#6B7280')}
            >
              Terms of Service
            </button>
            <span>•</span>

            {/* Discrete Studio Admin Link */}
            <button
              onClick={onOpenAdmin}
              aria-label="Open Studio Admin Portal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#A7F3D0',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
                e.currentTarget.style.color = '#A7F3D0';
              }}
              title="Studio Team Portal (or press Alt + A)"
            >
              <Lock size={12} color="#10B981" />
              <span>Studio CRM</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
