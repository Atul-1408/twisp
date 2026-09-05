import React, { useState } from 'react';
import { 
  X, Check, Copy, ExternalLink, ArrowRight, Sparkles, 
  Monitor, Smartphone, BookOpen, Layers, ShieldCheck, Cpu 
} from 'lucide-react';

export default function StudioFeatureModal({ feature, onClose, onAction }) {
  const [copiedColor, setCopiedColor] = useState(null);

  if (!feature) return null;

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const palette = [
    { name: 'Deep Emerald', hex: '#063B2B', desc: 'Primary Brand Tone' },
    { name: 'Dark Forest', hex: '#087F5B', desc: 'Secondary Accent' },
    { name: 'Fresh Mint', hex: '#10B981', desc: 'Interactive High-Energy' },
    { name: 'Soft Mint', hex: '#B8F2D5', desc: 'Highlight & Glow' },
    { name: 'Editorial Dark', hex: '#03130E', desc: 'Hero Canvas Background' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(3, 19, 14, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          backgroundColor: '#06281E',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '24px',
          padding: '36px',
          color: '#FFFFFF',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {feature.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#10B981', letterSpacing: '0.12em' }}>
                STUDIO SPECIFICATION INSPECT
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                {feature.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Inspection Modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '28px' }}>
          {feature.details}
        </p>

        {/* Interactive Feature Elements based on feature.id */}
        {feature.id === 'prism' || feature.id === 'gem' ? (
          /* DESIGN SYSTEM PALETTE INSPECTOR */
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#B8F2D5', marginBottom: '12px' }}>
              CLICK ANY COLOR TOKEN TO COPY HEX:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
              {palette.map((col) => (
                <button
                  key={col.hex}
                  onClick={() => copyHex(col.hex)}
                  style={{
                    backgroundColor: '#041B14',
                    border: copiedColor === col.hex ? '1.5px solid #10B981' : '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '10px',
                    padding: '12px 10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: col.hex,
                      margin: '0 auto 8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>{col.name}</div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: copiedColor === col.hex ? '#10B981' : '#9CA3AF' }}>
                    {copiedColor === col.hex ? 'COPIED!' : col.hex}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : feature.id === 'pedestal' || feature.id === 'screen' ? (
          /* CORE METRICS BENCHMARK */
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#B8F2D5', marginBottom: '12px' }}>
              PRODUCTION ARCHITECTURE BENCHMARKS:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ backgroundColor: '#041B14', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>99/100</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>Performance Vitals</div>
              </div>
              <div style={{ backgroundColor: '#041B14', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>0.4s</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>First Contentful Paint</div>
              </div>
              <div style={{ backgroundColor: '#041B14', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#A7F3D0', fontFamily: 'var(--font-mono)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>SEO & Accessibility</div>
              </div>
            </div>
          </div>
        ) : (
          /* PROCESS & WORKSPACE HIGHLIGHTS */
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#B8F2D5', marginBottom: '12px' }}>
              KEY ARCHITECTURAL DELIVERABLES:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Mobile-first responsive fluid grid system',
                'Strict WCAG AA accessible contrast & semantic tags',
                'Custom interactive 3D WebGL / CSS perspective shaders',
                'Honeypot anti-spam form architecture & CRM synchronization'
              ].map((deliv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#041B14',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    fontSize: '0.875rem',
                    color: '#E5E7EB',
                  }}
                >
                  <Check size={16} color="#10B981" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '20px' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem', padding: '10px 20px' }}
          >
            Close Inspector
          </button>

          <button
            onClick={() => {
              onClose();
              if (onAction) onAction(feature.actionTarget);
            }}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '10px 24px' }}
          >
            <span>{feature.actionLabel || 'Explore Feature'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
