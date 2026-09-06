import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenQuoteModal, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#why-twisp' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all var(--transition-normal)',
          backgroundColor: isScrolled ? 'rgba(3, 19, 14, 0.88)' : 'rgba(3, 19, 14, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(16, 185, 129, 0.18)' : '1px solid rgba(255, 255, 255, 0.05)',
          padding: isScrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* TWISP OFFICIAL BRAND LOGO */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
            aria-label="TWISP Web Design & Development Studio"
          >
            <img
              src="/assets/twisp-logo-white.png"
              alt="TWISP"
              style={{
                height: '34px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: 'var(--twisp-emerald-400)',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              STUDIO
            </span>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#10B981')}
                onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA & HAMBURGER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onOpenQuoteModal}
              className="btn btn-primary desktop-cta"
              style={{
                fontSize: '0.875rem',
                padding: '10px 20px',
              }}
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '8px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={22} color="#10B981" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(3, 19, 14, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '100px 32px 48px',
            animation: 'fadeIn 0.25s ease forwards',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981', letterSpacing: '0.15em' }}>
              NAVIGATION MENU
            </div>
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: '#10B981' }}>0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px' }}
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#6B7280' }}>
              Direct Studio Inquiries: twispstudio@gmail.com
            </div>
          </div>
        </div>
      )}

      {/* Navigation Responsive CSS */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
