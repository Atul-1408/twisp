import React, { useState, useRef } from 'react';
import { Monitor, Smartphone, BookOpen, Gem } from 'lucide-react';
import StudioFeatureModal from '../StudioFeatureModal';

export default function WorkspaceScene3D({ onOpenAdmin }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = -((y - centerY) / centerY) * 9;
    const rY = ((x - centerX) / centerX) * 11;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const hotspots = [
    {
      id: 'monitor',
      top: '38%',
      left: '48%',
      badge: 'Dashboard UI',
      title: 'TWISP Studio Dashboard',
      desc: 'Bespoke client dashboard & design system',
      details: 'A live control center for digital products, conversion funnel tracking, and Core Web Vitals audits. Provides full transparency into website performance and lead pipeline.',
      icon: <Monitor size={18} color="#10B981" />,
      actionLabel: 'Explore Studio CRM',
      actionTarget: 'crm',
    },
    {
      id: 'phone',
      top: '68%',
      left: '69%',
      badge: 'Mobile UI',
      title: 'Responsive Mobile UI',
      desc: 'Tested on all modern iOS & Android viewports',
      details: 'Every website is engineered mobile-first with adaptive layouts, touch-friendly 48px hit areas, and zero layout shift on 3G, 4G, and 5G networks.',
      icon: <Smartphone size={18} color="#B8F2D5" />,
      actionLabel: 'Request a Mobile Build',
      actionTarget: 'quote',
    },
    {
      id: 'notebook',
      top: '82%',
      left: '73%',
      badge: 'Strategy',
      title: 'Strategic Planning & UX',
      desc: 'Custom wireframing & UX architecture',
      details: 'Before writing any code, we document target client personas, content hierarchy, and conversion funnels to ensure the website directly moves your business forward.',
      icon: <BookOpen size={18} color="#10B981" />,
      actionLabel: 'See the 4-Step Process',
      actionTarget: 'process',
    },
    {
      id: 'gem',
      top: '74%',
      left: '86%',
      badge: 'Emerald Token',
      title: 'Emerald Prism & Tokens',
      desc: 'Signature emerald refraction & physical aesthetic',
      details: 'Our curated emerald design tokens create a unified luxury brand atmosphere. Click to inspect and copy color hex values.',
      icon: <Gem size={18} color="#34D399" />,
      actionLabel: 'Inquire for Custom Palette',
      actionTarget: 'quote',
    },
  ];

  const handleAction = (target) => {
    if (target === 'crm') {
      if (onOpenAdmin) {
        onOpenAdmin();
      } else {
        const adminBtn = document.querySelector('button[title*="Studio Team Portal"]');
        if (adminBtn) adminBtn.click();
      }
    } else if (target === 'quote') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'process') {
      const el = document.getElementById('process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '430px',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
        aria-label="Interactive 3D Studio Workspace Scene"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          }}
        >
          {/* Photorealistic 3D Workspace Scene */}
          <img
            src="/assets/3d/workspace-studio-3d.jpg"
            alt="TWISP 3D Workspace Rig & Architecture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.05) brightness(1.02)',
            }}
          />

          {/* Dynamic Specular Glare */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: isHovered
                ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(184, 242, 213, 0.2) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 70%)`
                : 'none',
              mixBlendMode: 'screen',
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Emerald Edge Atmosphere */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 30px rgba(6, 59, 43, 0.7), inset 0 0 10px rgba(16, 185, 129, 0.25)',
              borderRadius: '20px',
            }}
          />

          {/* Interactive Pulsing Hotspots with Badges */}
          {hotspots.map((hs) => (
            <div
              key={hs.id}
              style={{
                position: 'absolute',
                top: hs.top,
                left: hs.left,
                transform: 'translate(-50%, -50%)',
                zIndex: 25,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFeature(hs);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px 5px 6px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(3, 19, 14, 0.9)',
                  border: '1.5px solid #10B981',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(16, 185, 129, 0.5)',
                  transition: 'all 0.2s ease',
                  animation: 'pulseGlow 2.5s infinite ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.borderColor = '#34D399';
                  e.currentTarget.style.backgroundColor = '#063B2B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#10B981';
                  e.currentTarget.style.backgroundColor = 'rgba(3, 19, 14, 0.9)';
                }}
                title={`Click to inspect: ${hs.title}`}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '10px', color: '#03130E', fontWeight: 900 }}>+</span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    fontFamily: 'var(--font-mono)',
                    color: '#FFFFFF',
                  }}
                >
                  {hs.badge}
                </span>
              </button>
            </div>
          ))}

          {/* Live Interactive Status Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              right: '14px',
              backgroundColor: 'rgba(3, 19, 14, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              color: '#B8F2D5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isHovered ? '#34D399' : '#10B981',
                boxShadow: isHovered ? '0 0 10px #34D399' : '0 0 6px #10B981',
                transition: 'all 0.2s ease',
              }}
            />
            <span>CLICK BUTTONS TO INSPECT WORKSPACE</span>
          </div>
        </div>
      </div>

      {/* Feature Inspector Modal */}
      {selectedFeature && (
        <StudioFeatureModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
          onAction={handleAction}
        />
      )}
    </>
  );
}
