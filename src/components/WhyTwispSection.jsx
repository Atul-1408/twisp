import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import WorkspaceScene3D from './3d/WorkspaceScene3D';

export default function WhyTwispSection({ onOpenQuoteModal, onOpenAdmin }) {
  const points = [
    { title: 'Client-focused approach', desc: 'Every decision is tailored to your business objectives, not generic templates.' },
    { title: 'Modern responsive solutions', desc: 'Flawless visual presentation across mobile, tablet, laptop, and ultra-wide displays.' },
    { title: 'Clean, scalable development', desc: 'Built with modern engineering standards ensuring speed, security, and effortless updates.' },
    { title: 'Clear communication', desc: 'Direct access to the builder with transparent timelines and no agency bureaucratic layers.' },
    { title: 'Long-term support', desc: 'Continuous guidance, technical warranty, and proactive optimization after launch.' },
  ];

  return (
    <section
      id="why-twisp"
      style={{
        padding: '120px 0',
        backgroundColor: '#F7F9F7',
        borderTop: '1px solid rgba(17, 24, 23, 0.06)',
        borderBottom: '1px solid rgba(17, 24, 23, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div className="why-twisp-grid">
          {/* LEFT SIDE CONTENT */}
          <div className="why-twisp-left">
            <div className="section-label">WHY TWISP</div>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2.3rem, 4.2vw, 3.2rem)',
                marginBottom: '20px',
              }}
            >
              More than websites. <br />
              A partner in your growth.
            </h2>
            <p
              className="section-subtitle"
              style={{
                marginBottom: '36px',
                fontSize: '1.1rem',
              }}
            >
              We combine strategy, design and technology to create digital experiences that make businesses look better, work better and grow.
            </p>

            {/* List with checkmarks */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                marginBottom: '40px',
              }}
            >
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={16} color="#087F5B" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--twisp-charcoal)',
                        lineHeight: 1.3,
                      }}
                    >
                      {pt.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--twisp-text-muted)',
                        marginTop: '2px',
                        lineHeight: 1.5,
                      }}
                    >
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onOpenQuoteModal}
              className="btn btn-dark"
              style={{
                padding: '14px 28px',
                fontSize: '0.9375rem',
              }}
            >
              <span>Let's Work Together</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* RIGHT SIDE 3D WORKSPACE SCENE */}
          <div className="why-twisp-right">
            <div
              style={{
                backgroundColor: '#06281E',
                borderRadius: '24px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '16px',
                boxShadow: '0 24px 50px -10px rgba(6, 59, 43, 0.25)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  minHeight: '430px',
                  borderRadius: '16px',
                  backgroundColor: '#041B14',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <WorkspaceScene3D onOpenAdmin={onOpenAdmin} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-twisp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .why-twisp-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
