import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyTwispSection from './components/WhyTwispSection';
import SelectedWorkSection from './components/SelectedWorkSection';
import ProjectModal from './components/ProjectModal';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' &&
      (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin'))
  );
  const [legalModalType, setLegalModalType] = useState(null); // 'privacy' | 'terms' | null
  const [prefilledService, setPrefilledService] = useState('');

  // Handle browser URL navigation (/admin, /admin/login)
  useEffect(() => {
    const handleLocationChange = () => {
      const isPathAdmin =
        window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin');
      setIsAdminOpen(isPathAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const openAdmin = () => {
    if (window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminOpen(false);
  };

  // Keyboard shortcut Alt + A to toggle Admin CRM
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        if (isAdminOpen) {
          closeAdmin();
        } else {
          openAdmin();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen]);

  const scrollToQuote = () => {
    const formEl = document.getElementById('quote-form-container') || document.getElementById('contact');
    if (formEl) {
      const navOffset = 90;
      const elementPosition = formEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      // Focus name input after scroll
      setTimeout(() => {
        const input = document.getElementById('contact-name');
        if (input) input.focus();
      }, 500);
    }
  };

  const scrollToWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      const navOffset = 80;
      const elementPosition = workEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectForQuote = (projectTitle) => {
    setPrefilledService(`Website Build — ${projectTitle}`);
    scrollToQuote();
  };

  return (
    <div className="twisp-app">
      {/* Sticky Navigation */}
      <Navbar
        onOpenQuoteModal={scrollToQuote}
        onOpenAdmin={openAdmin}
      />

      {/* Main Sections */}
      <main>
        <HeroSection
          onOpenQuoteModal={scrollToQuote}
          onViewWork={scrollToWork}
        />

        <ServicesSection
          onOpenQuoteModal={scrollToQuote}
        />

        <WhyTwispSection
          onOpenQuoteModal={scrollToQuote}
          onOpenAdmin={openAdmin}
        />

        <SelectedWorkSection
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <ProcessSection />

        <ContactSection
          prefilledService={prefilledService}
          onLeadCreated={() => {
            // Optional callback
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={openAdmin}
        onOpenQuoteModal={scrollToQuote}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectForQuote={handleSelectForQuote}
        />
      )}

      {isAdminOpen && (
        <Suspense fallback={null}>
          <AdminDashboard
            onClose={closeAdmin}
          />
        </Suspense>
      )}

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </div>
  );
}
