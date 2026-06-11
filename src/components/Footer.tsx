import React from 'react';
import { Waves, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-forest-950 text-warm-100 border-t border-forest-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Commitment */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-forest-800 text-warm-100 rounded-lg">
                <Waves className="h-5 w-5" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                Secret Place
              </span>
            </div>
            <p className="text-sm text-forest-300 leading-relaxed">
              An community-driven eco-sanctuary protecting the sacred waters and forests of Vile Village, Philippines. Established to protect nature while supporting indigenous heritage.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-warm-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sanctuary Open Today</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-medium text-sm tracking-widest uppercase">
              Sanctuary Gates
            </h3>
            <ul className="space-y-2 text-sm text-forest-300">
              <li>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Corridor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Keepers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wild Experiences
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('booking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Secure Booking
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ephemeral Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Operational Information */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-medium text-sm tracking-widest uppercase">
              Treading Lightly
            </h3>
            <ul className="space-y-3 text-sm text-forest-300">
              <li className="flex items-start">
                <span className="text-forest-400 mr-2">✦</span>
                <span>Max 80 visitors allowed within code limits per day.</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-400 mr-2">✦</span>
                <span>Zero plastic policy is strictly enforced. Check bags at gate.</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-400 mr-2">✦</span>
                <span>Daily Conservation Fee goes directly to village guardians.</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-400 mr-2">✦</span>
                <span>Visiting Hours: 07:00 AM – 04:30 PM daily.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Guardians Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-medium text-sm tracking-widest uppercase">
              Community Cabin
            </h3>
            <ul id="footer-contact-info" className="space-y-3 text-sm text-forest-300">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-forest-400 shrink-0" />
                <span>Purok 4, Vile Village, Philippines</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-forest-400 shrink-0" />
                <a href="mailto:guardians@vilevillage.gov.ph" className="hover:text-white transition-colors">
                  guardians@vilevillage.gov.ph
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-forest-400 shrink-0" />
                <span>+63 917 123 4567</span>
              </li>
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center text-xs font-mono text-warm-400 hover:text-white transition-colors group"
              >
                <span>Connect with Warden Team</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row justify-between items-center text-xs text-forest-400 space-y-4 sm:space-y-0">
          <div>
            <p>© {currentYear} Vile Village Eco-Tourism Board. All Rights Reserved.</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Cocreated with love & respect for the land</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>by Local Guardians</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
