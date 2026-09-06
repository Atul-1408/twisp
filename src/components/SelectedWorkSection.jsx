import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/initialData';

export default function SelectedWorkSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = [
    'All',
    'Fitness & Wellness',
    'Restaurant & Hospitality',
    'Architecture & Interiors',
    'E-commerce & Beauty',
    'SaaS & Technology',
    'Travel & Tours',
  ];

  const filteredProjects = activeFilter === 'All'
    ? INITIAL_PROJECTS
    : INITIAL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section
      id="work"
      style={{
        padding: '120px 0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div className="section-label">SELECTED WORK</div>
            <h2 className="section-title">
              Real businesses. <br />
              Real digital experiences.
            </h2>
            <p className="section-subtitle">
              A curated selection of tailored web design and engineering concept systems built for performance, conversions, and distinctive brand presence.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '6px',
              backgroundColor: '#F7F9F7',
              borderRadius: '12px',
              border: '1px solid rgba(17, 24, 23, 0.06)',
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeFilter === f ? '#063B2B' : 'transparent',
                  color: activeFilter === f ? '#FFFFFF' : '#4B5563',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid — Exactly 3 columns x 2 rows on desktop */}
        <div className="portfolio-showcase-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="portfolio-card"
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(17, 24, 23, 0.08)',
                overflow: 'hidden',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* 1. Project Preview Image / Website Mockup */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: '#06281E',
                }}
              >
                <img
                  src={project.coverImage}
                  alt={`${project.title} Preview`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-smooth)',
                  }}
                  className="portfolio-thumb-img"
                  loading="lazy"
                />

                {/* 2. Small Category Badge at Top-Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(3, 19, 14, 0.82)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#B8F2D5',
                    letterSpacing: '0.02em',
                    zIndex: 2,
                  }}
                >
                  <span>{project.number} · {project.category}</span>
                </div>

                {/* Hover overlay hint */}
                <div
                  className="portfolio-hover-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(6, 40, 30, 0.35)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity var(--transition-fast)',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      padding: '9px 18px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--twisp-charcoal)',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>

              {/* Card Meta Content following exact hierarchy */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* 3. Project Category & 5. Year: 2026 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--twisp-emerald-700)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: '#9CA3AF',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 500,
                      }}
                    >
                      Year: {project.year || '2026'}
                    </span>
                  </div>

                  {/* 4. Project Name */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--twisp-charcoal)',
                      marginBottom: '10px',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={18}
                      color="#087F5B"
                      className="arrow-icon"
                      style={{
                        flexShrink: 0,
                        marginLeft: '8px',
                        transition: 'transform var(--transition-fast), color var(--transition-fast)',
                      }}
                    />
                  </h3>

                  {/* 6. Short Project Description */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--twisp-text-muted)',
                      marginBottom: '20px',
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: 7. Technology Badges & 8. "View Project →" CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(17, 24, 23, 0.06)',
                    paddingTop: '16px',
                    marginTop: 'auto',
                    gap: '12px',
                  }}
                >
                  {/* 7. Technology Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#4B5563',
                          backgroundColor: '#F3F4F6',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 8. "View Project →" CTA */}
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--twisp-emerald-850)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    View Project →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Responsive Grid: Desktop = 3x2, Tablet = 2x3, Mobile = 1x6 */
        .portfolio-showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 40px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .portfolio-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .portfolio-showcase-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .portfolio-card:hover {
          border-color: rgba(16, 185, 129, 0.4) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 48px -12px rgba(6, 59, 43, 0.16) !important;
        }
        .portfolio-card:hover .portfolio-thumb-img {
          transform: scale(1.03);
        }
        .portfolio-card:hover .portfolio-hover-overlay {
          opacity: 1 !important;
        }
        .portfolio-card:hover .arrow-icon {
          transform: translate(2px, -2px);
          color: #10B981 !important;
        }
      `}</style>
    </section>
  );
}
