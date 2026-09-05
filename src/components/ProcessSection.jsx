import React from 'react';
import { INITIAL_PROCESS } from '../data/initialData';
import { Search, Compass, Code, Rocket, Check } from 'lucide-react';

export default function ProcessSection() {
  const getIcon = (step) => {
    switch (step) {
      case '01':
        return <Search size={22} color="#10B981" />;
      case '02':
        return <Compass size={22} color="#10B981" />;
      case '03':
        return <Code size={22} color="#10B981" />;
      case '04':
        return <Rocket size={22} color="#10B981" />;
      default:
        return <Search size={22} color="#10B981" />;
    }
  };

  return (
    <section
      id="process"
      style={{
        padding: '120px 0',
        backgroundColor: '#03130E',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 40, 30, 0.4) 0%, rgba(3, 19, 14, 1) 100%)',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '640px' }}>
          <div className="section-label">OUR PROCESS</div>
          <h2 className="section-title light">
            A simple process <br />
            for great results.
          </h2>
          <p className="section-subtitle light">
            A transparent four-phase framework that eliminates guesswork, keeps you aligned, and delivers on schedule.
          </p>
        </div>

        {/* Connected Process Timeline */}
        <div
          style={{
            position: 'relative',
            marginTop: '64px',
          }}
        >
          {/* Subtle Horizontal Guide Line (Desktop) */}
          <div
            className="process-guide-line"
            style={{
              position: 'absolute',
              top: '40px',
              left: '50px',
              right: '50px',
              height: '2px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              zIndex: 0,
            }}
          />

          {/* 4 Process Step Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {INITIAL_PROCESS.map((step) => (
              <div
                key={step.step}
                className="process-step-card"
                style={{
                  backgroundColor: 'rgba(6, 40, 30, 0.5)',
                  border: '1px solid rgba(16, 185, 129, 0.18)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {/* Step Marker */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(4, 26, 19, 0.9)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    {getIcon(step.step)}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#10B981',
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '6px',
                  }}
                >
                  {step.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#34D399',
                    marginBottom: '16px',
                  }}
                >
                  {step.tagline}
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#94A3B8',
                    marginBottom: '20px',
                  }}
                >
                  {step.description}
                </p>

                {/* Step micro-deliverables */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {step.details.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        color: '#CBD5E1',
                      }}
                    >
                      <Check size={12} color="#10B981" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-guide-line {
            display: none !important;
          }
        }
        .process-step-card:hover {
          border-color: rgba(16, 185, 129, 0.45) !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.5) !important;
        }
      `}</style>
    </section>
  );
}
