import React, { useState, useRef } from 'react';
import { Monitor, Smartphone, BookOpen, Gem } from 'lucide-react';

export default function WorkspaceScene3D() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

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
    setActiveHotspot(null);
  };

  const hotspots = [
    {
      id: 'monitor',
      top: '38%',
      left: '48%',
      title: 'TWISP Studio Dashboard',
      desc: 'Bespoke client dashboard & design system',
      icon: <Monitor size={13} color="#10B981" />,
    },
    {
      id: 'phone',
      top: '68%',
      left: '69%',
      title: 'Responsive Mobile UI',
      desc: 'Tested on all modern iOS & Android viewports',
      icon: <Smartphone size={13} color="#B8F2D5" />,
    },
    {
      id: 'notebook',
      top: '80%',
      left: '73%',
      title: 'Strategic Planning',
      desc: 'Custom wireframing & UX architecture',
      icon: <BookOpen size={13} color="#10B981" />,
    },
    {
      id: 'gem',
      top: '74%',
      left: '86%',
      title: 'Emerald Prism',
      desc: 'Signature emerald refraction & physical aesthetic',
      icon: <Gem size={13} color="#34D399" />,
    },
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '420px',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'crosshair',
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

        {/* Interactive Pulsing Hotspots */}
        {hotspots.map((hs) => (
          <div
            key={hs.id}
            style={{
              position: 'absolute',
              top: hs.top,
              left: hs.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            onMouseEnter={() => setActiveHotspot(hs.id)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
              aria-label={hs.title}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(3, 19, 14, 0.85)',
                border: '1.5px solid #10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.6)',
                animation: 'pulseGlow 2s infinite ease-in-out',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  animation: 'ripple 2s infinite ease-out',
                }}
              />
              {hs.icon}
            </button>

            {/* Micro Tooltip */}
            {(activeHotspot === hs.id || isHovered) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '38px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(3, 19, 14, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                  opacity: activeHotspot === hs.id ? 1 : 0.85,
                  transition: 'all 0.2s ease',
                  zIndex: 30,
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  {hs.title}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                  {hs.desc}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Interactive Status Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            backgroundColor: 'rgba(3, 19, 14, 0.82)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '5px 12px',
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            color: '#B8F2D5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
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
          <span>{isHovered ? 'WORKSPACE EXPLORER ACTIVE' : 'HOVER TO EXPLORE WORKSPACE'}</span>
        </div>
      </div>
    </div>
  );
}
