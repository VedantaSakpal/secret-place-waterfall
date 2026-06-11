import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Shield, Trash2 } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');
  
  // Storage
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('waterfall_contact_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const newMsg: ContactMessage = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      subject,
      message,
      sentAt: new Date().toISOString()
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('waterfall_contact_messages', JSON.stringify(updated));

    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');
    
    // Auto clear success banner after 5.5s
    setTimeout(() => {
      setIsSent(false);
    }, 5500);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('waterfall_contact_messages', JSON.stringify(updated));
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 font-sans animate-fade-in space-y-16">
      
      {/* 1. Header Hero Area */}
      <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Pristine green valley nature" 
            className="w-full h-full object-cover filter brightness-[0.4] scale-102"
          />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-warm-300 uppercase">
            Village Liaison Box
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Connect with the Guardians of the Sanctuary
          </h2>
          <p className="text-forest-200 text-sm sm:text-base font-light leading-relaxed">
            Have a custom photography request, a private village meal alignment, or questions regarding mobility? Our team at the Chief Warden cabin reads letters daily.
          </p>
        </div>
      </div>

      {/* 2. Main Two-Column Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left: Contact Send Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-forest-950 flex items-center">
              <Mail className="h-5 w-5 text-forest-600 mr-2" />
              Send a Message to the Cabin
            </h3>
            <p className="text-xs text-forest-500 font-light">
              We aim to reply via active email within 12-24 hours of landing coordinates.
            </p>
          </div>

          <form id="contact-liaison-form" onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="contact-name" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="contact-name"
                  required
                  placeholder="e.g. Liam Christopher"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="contact-email" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="contact-email"
                  required
                  placeholder="e.g. liam@nature.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label htmlFor="contact-topic" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                Inquiry Topic
              </label>
              <select 
                id="contact-topic"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-all"
              >
                <option value="General feedback">General Guest Feedback</option>
                <option value="Private Tour Enquiry">Custom Private Tour Details</option>
                <option value="Emergency assistance">Safety Line or Aid</option>
                <option value="Mobility assistance">Accessibility & Mobility Information</option>
              </select>
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label htmlFor="contact-msg" className="block text-[10px] font-bold text-forest-800 font-mono uppercase tracking-wider">
                My Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="contact-msg"
                required
                rows={4}
                placeholder="Describe your inquiry simply..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              className="w-full py-3.5 bg-forest-700 hover:bg-forest-800 text-warm-50 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-1.5 transition-colors shadow"
            >
              <Send className="h-4 w-4" />
              <span>Deliver Letter to Cabin</span>
            </button>

          </form>

          {/* Success banner inside form */}
          {isSent && (
            <div id="contact-success-banner" className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-800 text-xs sm:text-sm animate-fade-in">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Your message was successfully pinned! Wardens have received your letter.</span>
            </div>
          )}

        </div>

        {/* Right: Community Contacts & Location Indicator HUD */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Quick HUD Card contacts */}
          <div className="bg-warm-100 rounded-2xl p-6 border border-forest-150 space-y-5">
            <h4 className="font-serif text-base font-bold text-forest-900 flex items-center border-b border-forest-200 pb-2">
              <Shield className="h-5 w-5 text-forest-600 mr-2" />
              Community Contacts
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-forest-950 block">Chief Warden Alon Tagalog</span>
                  <span className="text-[10px] text-forest-500 font-mono">CHIEF WARDEN & ADVISOR</span>
                </div>
                <a href="mailto:alon@vilevillage.gov.ph" className="text-forest-700 hover:text-forest-900 border-b border-forest-300">
                  Email Alon
                </a>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-forest-950 block">Safety Lead Lana Soliman</span>
                  <span className="text-[10px] text-forest-500 font-mono">SAFETY & FIRST AID</span>
                </div>
                <a href="tel:+639171230005" className="text-forest-700 hover:text-forest-900 border-b border-forest-300">
                  Call Safety
                </a>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-forest-950 block">Coordinator Santi Caparas</span>
                  <span className="text-[10px] text-forest-500 font-mono">BOOKING COORDINATOR</span>
                </div>
                <a href="mailto:santi@vilevillage.gov.ph" className="text-forest-700 hover:text-forest-900 border-b border-forest-300">
                  Email Santi
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats list / physical details */}
          <div className="bg-forest-950 text-white rounded-2xl p-6 border border-forest-900 space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-warm-300 uppercase">
              Physical Location Coordinates
            </h4>
            
            <div className="space-y-3.5 text-xs font-mono text-forest-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-white font-serif block">Purok 4 Gates, Vile Village</span>
                  <p className="font-sans text-[11px] text-forest-400 mt-0.5">Located at the southern foot of the Veridian mountain range.</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-forest-900 pt-3">
                <span>Phone line:</span>
                <span className="text-white">+63 917 123 4567</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Radio Channel:</span>
                <span className="text-white">VHF 144.850 MHz</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Locally saved message log dashboard to let user see feedback forms stored */}
      {messages.length > 0 && (
        <div id="contact-history-dashboard" className="space-y-4 pt-4 border-t border-forest-100">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-950">
            Letters we recorded ({messages.length})
          </h3>
          <p className="text-xs text-forest-500 font-light">
            Stored securely inside this local browser session. Shows the submissions delivered to the Chief Warden cabin.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className="bg-white rounded-xl p-5 border border-forest-100 shadow-sm space-y-3 hover:border-forest-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-forest-400 font-mono block">LETTER ID</span>
                    <h4 className="font-mono text-xs font-semibold text-forest-900">{m.id}</h4>
                  </div>
                  <button 
                    onClick={() => handleDeleteMessage(m.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-forest-800">
                  <div>
                    <span className="font-bold text-forest-950 block">Topic: {m.subject}</span>
                    <p className="italic font-light leading-relaxed mt-1">&ldquo;{m.message}&rdquo;</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px] text-forest-400 font-mono border-t border-forest-50 pt-2">
                    <span>Sender: {m.name} ({m.email})</span>
                    <span>Delivered: {new Date(m.sentAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
