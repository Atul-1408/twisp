import React from 'react';
import { ArrowRight, Code2, Sparkles, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import HeroScene3D from './3d/HeroScene3D';

export default function HeroSection({ onOpenQuoteModal, onViewWork }) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        backgroundColor: '#03130E',
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(6, 59, 43, 0.45) 0%, rgba(3, 19, 14, 1) 70%)',
        color: '#FFFFFF',
        paddingTop: 'calc(var(--nav-height) + 40px)',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle architectural grid background lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          {/* LEFT CONTENT COLUMN */}
          <div className="hero-left">
            {/* Eyebrow badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(6, 59, 43, 0.7)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#A7F3D0',
                  textTransform: 'uppercase',
                }}
              >
                DIGITAL DESIGN & DEVELOPMENT STUDIO
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              Websites built to <br />
              move your business <br />
              <span
                style={{
                  color: '#10B981',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                forward.
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: 0,
                    right: 0,
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(16, 185, 129, 0.4)',
                  }}
                />
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.65,
                color: '#94A3B8',
                maxWidth: '540px',
                marginBottom: '36px',
              }}
            >
              Strategy, design and development for businesses ready to grow online.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '44px',
              }}
            >
              <button
                onClick={onOpenQuoteModal}
                className="btn btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                }}
              >
                <span>Get a Free Quote</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onViewWork}
                className="btn btn-secondary"
                style={{
                  padding: '14px 26px',
                  fontSize: '1rem',
                }}
              >
                <span>View Our Work</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Honest Trust Metrics / Value Row */}
            <div
              style={{
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#10B981',
                  fontWeight: 600,
                }}
              >
                STUDIO CORE CAPABILITIES
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px 20px',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  color: '#CBD5E1',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981' }}>•</span> Strategy
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981' }}>•</span> Modern Design
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981' }}>•</span> Custom Development
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981' }}>•</span> Conversion Growth
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 3D PRESENTATION CONTAINER (Matching Reference Layout) */}
          <div className="hero-right">
            <div
              style={{
                backgroundColor: 'rgba(6, 40, 30, 0.45)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '24px',
                padding: '16px',
                position: 'relative',
                boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.08)',
                backdropFilter: 'blur(12px)',
                overflow: 'hidden',
              }}
            >
              {/* 3D Scene Viewport */}
              <div
                style={{
                  width: '100%',
                  minHeight: '430px',
                  borderRadius: '16px',
                  backgroundColor: '#031912',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <HeroScene3D />
              </div>

              {/* Trust Metric Cards (Matching reference 2x2 grid layout) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginTop: '16px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(4, 26, 19, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>Bespoke Quality</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>Custom coded, zero templates</div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(4, 26, 19, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>Fast Turnaround</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>Agile delivery cycles</div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(4, 26, 19, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>Direct Access</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>Talk directly to the creators</div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(4, 26, 19, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>90+ Core Vitals</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>Speed & conversion optimized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 60px;
          }
        }
      `}</style>
    </section>
  );
}
