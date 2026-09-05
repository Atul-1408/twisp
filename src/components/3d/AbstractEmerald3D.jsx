import React, { useState, useRef } from 'react';

export default function AbstractEmerald3D() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = -((y - centerY) / centerY) * 12;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        height: '420px',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'grab',
        perspective: '1000px',
        margin: '0 auto',
      }}
      aria-label="Interactive 3D Abstract Emerald Glass Sculpture"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.25)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
        }}
      >
        <img
          src="/assets/3d/cta-abstract-emerald.jpg"
          alt="TWISP Abstract Emerald Glass Sculpture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'contrast(1.06) brightness(1.02)',
          }}
        />

        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 40px rgba(6, 59, 43, 0.8)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(3, 19, 14, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            color: '#B8F2D5',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          <span style={{ color: '#10B981', marginRight: '6px' }}>✦</span>
          SIGNATURE EMERALD GLASS SCULPTURE
        </div>
      </div>
    </div>
  );
}
