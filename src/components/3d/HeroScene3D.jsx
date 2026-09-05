import React, { useState, useRef } from 'react';
import { Sparkles, Eye, Code, Layers } from 'lucide-react';
import StudioFeatureModal from '../StudioFeatureModal';

export default function HeroScene3D({ onNavigate }) {
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
    const rX = -((y - centerY) / centerY) * 10;
    const rY = ((x - centerX) / centerX) * 12;

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
      id: 'screen',
      top: '32%',
      left: '34%',
      badge: 'Live Interface',
      title: 'TWISP Live Interface',
      desc: 'Bespoke UI, bold typography & 99 Core Web Vitals',
      details: 'The TWISP studio interface is engineered for maximum conversion, editorial credibility, and speed. Built with bespoke CSS tokens, clean React architecture, and optimized WebGL to guarantee a flawless 99/100 Core Web Vitals score across all modern viewports.',
      icon: <Eye size={18} color="#10B981" />,
      actionLabel: 'View Selected Work',
      actionTarget: 'work',
    },
    {
      id: 'prism',
      top: '48%',
      left: '78%',
      badge: 'Emerald System',
      title: 'Emerald Material System',
      desc: 'Refractive emerald glass identity & luxury palette',
      details: 'Our signature deep emerald identity uses a harmonious 5-tier color scale (#063B2B, #087F5B, #10B981, #B8F2D5, #03130E). Designed to evoke the authority of a luxury US digital product practice rather than a generic SaaS template.',
      icon: <Sparkles size={18} color="#B8F2D5" />,
      actionLabel: 'Request a Free Quote',
      actionTarget: 'quote',
    },
    {
      id: 'pedestal',
      top: '76%',
      left: '28%',
      badge: 'Architecture',
      title: 'Architectural Platform',
      desc: 'Solid engineering foundation & scalable architecture',
      details: 'Every line of code is bespoke, modular, and maintainable. We avoid heavy bloated page builders in favor of lightweight, component-driven code engineered for instantaneous navigation and zero layout shift.',
      icon: <Layers size={18} color="#10B981" />,
      actionLabel: 'Explore Our Process',
      actionTarget: 'process',
    },
  ];

  const handleAction = (target) => {
    if (target === 'work') {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        aria-label="Interactive 3D Studio Laptop and Emerald Glass Scene"
      >
        {/* 3D TILT WRAPPER */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          }}
        >
          {/* Photorealistic 3D Render Image */}
          <img
            src="/assets/3d/hero-studio-3d.jpg"
            alt="TWISP 3D Studio Laptop & Emerald Glass Composition"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.05) brightness(1.02)',
            }}
          />

          {/* Dynamic Specular Glare Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: isHovered
                ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(184, 242, 213, 0.22) 0%, rgba(16, 185, 129, 0.06) 35%, transparent 70%)`
                : 'none',
              mixBlendMode: 'screen',
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Emerald Ambient Edge Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 30px rgba(6, 59, 43, 0.7), inset 0 0 10px rgba(16, 185, 129, 0.3)',
              borderRadius: '20px',
            }}
          />

          {/* Interactive Clickable Hotspots with Badges */}
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
            <span>CLICK BUTTONS TO INSPECT 3D SPECS</span>
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

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.85); }
        }
      `}</style>
    </>
  );
}
