import React, { useState, useEffect } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

/**
 * ProgressiveImage
 * High-performance image component with:
 * - Fixed aspect ratio container (prevents zero-height layout shift / empty line bugs)
 * - Emerald shimmer skeleton loader while downloading
 * - Smooth fade-in transition on load
 * - Fallback error handling
 * - Optional click-to-zoom / lightbox trigger
 */
export default function ProgressiveImage({
  src,
  alt,
  aspectRatio = '16 / 10',
  className = '',
  imgClassName = '',
  style = {},
  imgStyle = {},
  loading = 'lazy',
  fetchPriority = 'auto',
  onClick,
  showZoomHint = false,
  badgeText = null,
  rounded = '12px',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset states if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`progressive-img-wrapper ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        overflow: 'hidden',
        borderRadius: rounded,
        backgroundColor: '#06281E',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {/* 1. Shimmer Skeleton Animation while loading */}
      {!isLoaded && !hasError && (
        <div
          className="image-skeleton-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(3, 19, 14, 0.65)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              color: '#A7F3D0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.04em',
            }}
          >
            <Loader2 size={13} className="spin-animation" style={{ color: '#10B981' }} />
            <span>LOADING PREVIEW</span>
          </div>
        </div>
      )}

      {/* 2. Error Fallback State */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#07241A',
            color: '#9CA3AF',
            padding: '16px',
            textAlign: 'center',
            gap: '8px',
            zIndex: 2,
          }}
        >
          <ImageOff size={24} color="#34D399" />
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            Preview preview unavailable
          </span>
        </div>
      )}

      {/* 3. The Actual Image with Fade-in */}
      {!hasError && (
        <img
          src={src}
          alt={alt || 'Project Preview'}
          loading={loading}
          fetchpriority={fetchPriority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`progressive-img ${isLoaded ? 'loaded' : ''} ${imgClassName}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            ...imgStyle,
          }}
        />
      )}

      {/* Optional Badge (e.g. Device Type or Screen Label) */}
      {badgeText && isLoaded && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            zIndex: 3,
            padding: '4px 10px',
            borderRadius: '6px',
            backgroundColor: 'rgba(3, 19, 14, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#B8F2D5',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            pointerEvents: 'none',
          }}
        >
          {badgeText}
        </div>
      )}

      {/* Optional Hover Zoom Icon Hint */}
      {showZoomHint && isLoaded && (
        <div className="progressive-img-hover-hint">
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>Click to Expand</span>
        </div>
      )}
    </div>
  );
}
