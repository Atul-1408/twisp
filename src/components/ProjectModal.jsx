import React, { useEffect, useState } from 'react';
import { X, ExternalLink, ArrowRight, Check, Layers, Cpu, Compass, Maximize2 } from 'lucide-react';
import ProgressiveImage from './common/ProgressiveImage';
import ImageLightbox from './common/ImageLightbox';

export default function ProjectModal({ project, onClose, onSelectForQuote }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [screenTab, setScreenTab] = useState('all'); // 'all' | 'desktop' | 'mobile'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, lightboxIndex]);

  if (!project) return null;

  // Prepare full images list for Lightbox navigation
  const allModalImages = [
    {
      src: project.coverImage,
      alt: `${project.title} - Main Design Showcase`,
      label: 'Cover Presentation',
    },
    ...(project.screens || []).map((screen, idx) => {
      const isMobile = typeof screen === 'string' && screen.toLowerCase().includes('mobile');
      return {
        src: screen,
        alt: `${project.title} Preview ${idx + 1}`,
        label: isMobile ? 'Mobile Responsive Experience' : `Desktop System View 0${idx + 1}`,
        isMobile,
      };
    }),
  ];

  const allScreens = (project.screens || []).map((screen, idx) => {
    const isMobile = typeof screen === 'string' && screen.toLowerCase().includes('mobile');
    return {
      screen,
      originalIdx: idx,
      isMobile,
      label: isMobile ? 'Mobile Responsive Experience' : `Desktop View 0${idx + 1}`,
    };
  });

  const desktopCount = allScreens.filter((s) => !s.isMobile).length;
  const mobileCount = allScreens.filter((s) => s.isMobile).length;

  const visibleScreens =
    screenTab === 'desktop'
      ? allScreens.filter((s) => !s.isMobile)
      : screenTab === 'mobile'
      ? allScreens.filter((s) => s.isMobile)
      : allScreens;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backgroundColor: 'rgba(3, 19, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <div
          style={{
            width: '100%',
            maxWidth: '960px',
            maxHeight: '90vh',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Top Sticky Header */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 32px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid rgba(17, 24, 23, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--twisp-emerald-850)',
                  backgroundColor: 'var(--twisp-mint-50)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                {project.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
                CONCEPT CASE STUDY
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Project Details"
              style={{
                background: '#F3F4F6',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
            >
              <X size={20} color="#111817" />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '32px' }}>
            {/* Title and Tagline */}
            <div style={{ marginBottom: '24px' }}>
              <h2
                id="modal-project-title"
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                  fontWeight: 800,
                  color: 'var(--twisp-charcoal)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  marginBottom: '8px',
                }}
              >
                {project.title}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--twisp-emerald-700)', fontWeight: 500 }}>
                {project.tagline}
              </p>
            </div>

            {/* Large Hero Project Preview with Progressive Loading & Lightbox Zoom */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#06281E',
                border: '1px solid rgba(17, 24, 23, 0.1)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                marginBottom: '36px',
                cursor: 'pointer',
              }}
              onClick={() => setLightboxIndex(0)}
            >
              <ProgressiveImage
                src={project.coverImage}
                alt={`${project.title} website UI preview`}
                aspectRatio="16 / 9"
                rounded="16px"
                fetchPriority="high"
                loading="eager"
                showZoomHint={true}
                badgeText="Interactive Hero Monograph · Click to expand"
                onClick={() => setLightboxIndex(0)}
              />
            </div>

            {/* 3 Metric Badges */}
            {project.metrics && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '36px',
                }}
              >
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--twisp-offwhite)',
                      border: '1px solid rgba(17, 24, 23, 0.08)',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--twisp-emerald-850)',
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '4px' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Project Breakdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                marginBottom: '40px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--twisp-charcoal)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Compass size={18} color="#10B981" />
                  The Challenge
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#4B5563' }}>
                  {project.challenge}
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--twisp-charcoal)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Layers size={18} color="#10B981" />
                  The Solution
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#4B5563' }}>
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Architectural Features */}
            <div style={{ marginBottom: '36px' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--twisp-charcoal)',
                  marginBottom: '16px',
                }}
              >
                Key Features & Architectural Decisions
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                }}
              >
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#F7F9F7',
                      border: '1px solid rgba(17, 24, 23, 0.05)',
                    }}
                  >
                    <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extended Project Mockups & Device Views with Balanced 2x2 Grid & Tabs */}
            {allScreens.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--twisp-charcoal)',
                        margin: 0,
                      }}
                    >
                      System Previews & Device Mockups
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '4px 0 0' }}>
                      Hover to view page details · Click any screen for fullscreen HD inspection
                    </p>
                  </div>

                  {/* Filter Tabs & Zoom Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',
                        padding: '3px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '10px',
                        border: '1px solid rgba(17, 24, 23, 0.06)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setScreenTab('all')}
                        style={{
                          border: 'none',
                          padding: '5px 12px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: screenTab === 'all' ? 700 : 500,
                          backgroundColor: screenTab === 'all' ? 'var(--twisp-emerald-850)' : 'transparent',
                          color: screenTab === 'all' ? '#FFFFFF' : '#4B5563',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        All ({allScreens.length})
                      </button>

                      {desktopCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setScreenTab('desktop')}
                          style={{
                            border: 'none',
                            padding: '5px 12px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: screenTab === 'desktop' ? 700 : 500,
                            backgroundColor: screenTab === 'desktop' ? 'var(--twisp-emerald-850)' : 'transparent',
                            color: screenTab === 'desktop' ? '#FFFFFF' : '#4B5563',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Desktop ({desktopCount})
                        </button>
                      )}

                      {mobileCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setScreenTab('mobile')}
                          style={{
                            border: 'none',
                            padding: '5px 12px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: screenTab === 'mobile' ? 700 : 500,
                            backgroundColor: screenTab === 'mobile' ? 'var(--twisp-emerald-850)' : 'transparent',
                            color: screenTab === 'mobile' ? '#FFFFFF' : '#4B5563',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Mobile ({mobileCount})
                        </button>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        color: 'var(--twisp-emerald-700)',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: 'var(--twisp-mint-50)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <Maximize2 size={13} />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>

                {/* The Responsive Grid with ZERO empty space */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      screenTab === 'desktop' && desktopCount === 3
                        ? 'repeat(auto-fit, minmax(250px, 1fr))'
                        : screenTab === 'mobile'
                        ? '1fr'
                        : 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {visibleScreens.map((item) => (
                    <div
                      key={item.originalIdx}
                      className="preview-card-interactive"
                      style={{
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '1px solid rgba(17, 24, 23, 0.08)',
                        backgroundColor: '#06281E',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                        cursor: 'pointer',
                        maxWidth: screenTab === 'mobile' ? '540px' : 'none',
                        margin: screenTab === 'mobile' ? '0 auto' : '0',
                        width: '100%',
                      }}
                    >
                      <ProgressiveImage
                        src={item.screen}
                        alt={`${project.title} Preview ${item.originalIdx + 1}`}
                        aspectRatio={screenTab === 'mobile' ? '16 / 11' : '16 / 10'}
                        loading="lazy"
                        rounded="14px"
                        badgeText={item.label}
                        showZoomHint={true}
                        onClick={() => setLightboxIndex(item.originalIdx + 1)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies & Deliverables */}
            <div
              style={{
                paddingTop: '24px',
                borderTop: '1px solid rgba(17, 24, 23, 0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#374151',
                      backgroundColor: '#F3F4F6',
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForQuote(project.title);
                }}
                className="btn btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>Request Similar Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.97); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>

      {/* High Definition Interactive Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={allModalImages}
          currentIndex={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </>
  );
}
