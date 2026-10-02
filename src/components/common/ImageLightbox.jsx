import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!images || images.length === 0 || currentIndex === null || currentIndex === undefined) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        backgroundColor: 'rgba(3, 19, 14, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'modalFadeIn 0.2s ease-out forwards',
      }}
      onClick={onClose}
    >
      {/* Lightbox Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          zIndex: 10,
          background: 'linear-gradient(to bottom, rgba(3, 19, 14, 0.8), transparent)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
            }}
          >
            {title || 'Project Preview'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#34D399',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '3px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FFFFFF',
            transition: 'background var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Preview Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '92vw',
          maxHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={typeof currentImage === 'string' ? currentImage : currentImage.src}
          alt={typeof currentImage === 'string' ? `${title} View ${currentIndex + 1}` : currentImage.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '82vh',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Prev / Next Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous Image"
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(3, 19, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#FFFFFF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast), background var(--transition-fast)',
              zIndex: 15,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(3, 19, 14, 0.75)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            aria-label="Next Image"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(3, 19, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#FFFFFF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast), background var(--transition-fast)',
              zIndex: 15,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(3, 19, 14, 0.75)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigation Thumbnails at bottom */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '24px',
            backgroundColor: 'rgba(3, 19, 14, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            zIndex: 15,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => {
            const src = typeof img === 'string' ? img : img.src;
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                style={{
                  width: '36px',
                  height: '24px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: isSelected ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.2)',
                  opacity: isSelected ? 1 : 0.6,
                  cursor: 'pointer',
                  padding: 0,
                  background: '#06281E',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
