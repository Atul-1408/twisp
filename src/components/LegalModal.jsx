import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(3, 19, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '80vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '36px',
          overflowY: 'auto',
          color: '#111817',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} color="#087F5B" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            <strong>Effective Date:</strong> January 1, 2026 — TWISP Digital Design & Development Studio.
          </p>

          {isPrivacy ? (
            <>
              <p>
                At TWISP, we respect your confidentiality. When you submit a project inquiry or request a quote through our website, we collect only the information necessary to evaluate your project scope, provide an accurate proposal, and communicate directly with you.
              </p>
              <h4 style={{ color: '#111817', marginTop: '8px' }}>1. Information Collected</h4>
              <p>
                We collect your name, business name, work email, telephone number (if voluntarily provided), project budget tier, and project specifications. We do not sell, rent, or distribute client data to third-party brokers or advertisers.
              </p>
              <h4 style={{ color: '#111817', marginTop: '8px' }}>2. Data Security & Storage</h4>
              <p>
                Inquiries are stored securely. We maintain appropriate administrative and technical safeguards to prevent unauthorized access or disclosure.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to TWISP. By reviewing our portfolio, consulting our studio, or requesting proposals, you agree to the following terms:
              </p>
              <h4 style={{ color: '#111817', marginTop: '8px' }}>1. Scope of Engagement</h4>
              <p>
                All creative work, development sprints, and deliverables are executed under formal, signed studio agreements outlining milestones, intellectual property transfers, and warranties.
              </p>
              <h4 style={{ color: '#111817', marginTop: '8px' }}>2. Intellectual Property</h4>
              <p>
                Concept portfolio items displayed on twisp.studio demonstrate design capabilities, interaction patterns, and technical execution. Upon full payment of commissioned project scopes, full client ownership of final assets is transferred.
              </p>
            </>
          )}

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-dark" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
