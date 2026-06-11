import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ActivitiesView from './components/ActivitiesView';
import BookingView from './components/BookingView';
import GalleryView from './components/GalleryView';
import ContactView from './components/ContactView';
import { ArrowUp, Trees, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show back-to-top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on tab change to give clean screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutView />;
      case 'activities':
        return <ActivitiesView setActiveTab={setActiveTab} />;
      case 'booking':
        return <BookingView />;
      case 'gallery':
        return <GalleryView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col justify-between selection:bg-forest-100 selection:text-forest-950 font-sans">
      
      {/* 1. Header with custom Navigation callbacks */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Primary Layout Canvas */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* 3. Sustainable Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Elegant Back-to-Top Floating Lever */}
      {showScrollTop && (
        <button
          id="scroll-to-top-button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-forest-800 text-warm-50 rounded-xl shadow-lg border border-forest-700 hover:bg-forest-700 hover:scale-105 active:scale-95 transition-all duration-300 z-50 cursor-pointer"
          aria-label="Return to Canopy top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

    </div>
  );
}
