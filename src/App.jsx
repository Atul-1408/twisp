import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyTwispSection from './components/WhyTwispSection';
import SelectedWorkSection from './components/SelectedWorkSection';
import ProjectModal from './components/ProjectModal';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import LegalModal from './components/LegalModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null); // 'privacy' | 'terms' | null
  const [prefilledService, setPrefilledService] = useState('');

  // Keyboard shortcut Alt + A to toggle Admin CRM
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        onOpenAdmin={() => setIsAdminOpen(true)}
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
        onOpenAdmin={() => setIsAdminOpen(true)}
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
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
        />
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
