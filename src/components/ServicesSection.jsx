import React from 'react';
import { Compass, Palette, Code2, TrendingUp, Check } from 'lucide-react';
import { INITIAL_SERVICES } from '../data/initialData';

export default function ServicesSection({ onOpenQuoteModal }) {
  const getIcon = (id) => {
    switch (id) {
      case 'strategy':
        return <Compass size={28} color="#10B981" />;
      case 'design':
        return <Palette size={28} color="#10B981" />;
      case 'development':
        return <Code2 size={28} color="#10B981" />;
      case 'growth':
        return <TrendingUp size={28} color="#10B981" />;
      default:
        return <Compass size={28} color="#10B981" />;
    }
  };

  return (
    <section
      id="services"
      style={{
        padding: '110px 0',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--twisp-border-light)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '720px' }}>
          <div className="section-label">OUR SERVICES</div>
          <h2 className="section-title">
            Everything you need <br />
            to grow online.
          </h2>
          <p className="section-subtitle">
            We design and develop high-performance websites that help businesses build trust, attract customers and grow online.
          </p>
        </div>

        {/* 4 Premium Minimal Service Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
            marginTop: '56px',
          }}
        >
          {INITIAL_SERVICES.map((service) => (
            <div
              key={service.id}
              className="twisp-card service-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px 30px',
                border: '1px solid rgba(17, 24, 23, 0.08)',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                transition: 'all var(--transition-normal)',
              }}
            >
              <div>
                {/* Header row: Number & Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--twisp-emerald-850)',
                    }}
                  >
                    {service.number}
                  </span>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--twisp-mint-50)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(service.id)}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--twisp-charcoal)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--twisp-text-muted)',
                    marginBottom: '28px',
                  }}
                >
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div
                  style={{
                    borderTop: '1px solid rgba(17, 24, 23, 0.06)',
                    paddingTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: 'var(--twisp-charcoal)',
                      }}
                    >
                      <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div
                style={{
                  marginTop: '32px',
                  paddingTop: '16px',
                  borderTop: '1px dashed rgba(17, 24, 23, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--twisp-emerald-700)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Pillar • {service.highlight}
                </span>
                <button
                  onClick={onOpenQuoteModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--twisp-emerald-850)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Inquire →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover {
          border-color: rgba(16, 185, 129, 0.4) !important;
          box-shadow: 0 16px 36px -8px rgba(6, 59, 43, 0.12) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
