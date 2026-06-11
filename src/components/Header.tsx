import React, { useState } from 'react';
import { Menu, X, Waves, BookOpen, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'activities', label: 'Activities' },
    { id: 'booking', label: 'Booking' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-warm-50/90 backdrop-blur-md border-b border-forest-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="p-2.5 bg-forest-600 text-warm-50 rounded-xl shadow-md transition-transform group-hover:scale-105 duration-300">
              <Waves className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-forest-900 group-hover:text-forest-600 transition-colors">
                Secret Place Waterfall
              </h1>
              <div className="flex items-center text-xs font-mono text-warm-600">
                <MapPin className="h-3 w-3 mr-0.5 text-forest-400" />
                <span>Vile Village, Philippines</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav id="desktop-nav" className="hidden md:flex space-x-1 lg:space-x-2 items-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-forest-900 font-semibold' 
                      : 'text-forest-600 hover:text-forest-900 hover:bg-forest-100/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      id={`active-indicator-${item.id}`}
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-forest-600 rounded-full" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              id="header-cta-book"
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 bg-forest-700 text-warm-50 font-medium text-sm rounded-xl hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 font-sans tracking-wide"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-forest-600 hover:text-forest-900 hover:bg-forest-100/50 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-panel" className="md:hidden border-b border-forest-100 bg-warm-50 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-forest-100 text-forest-900 font-semibold' 
                      : 'text-forest-600 hover:bg-forest-50 hover:text-forest-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-4">
              <button
                id="mobile-header-cta-book"
                onClick={() => handleNavClick('booking')}
                className="w-full py-3 bg-forest-700 text-warm-50 text-center font-medium rounded-xl hover:bg-forest-800 transition-colors shadow-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
