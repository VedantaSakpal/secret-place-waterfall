import React from 'react';
import { ShieldCheck, Compass, Users, Heart, ArrowRight, Star, Map, Calendar, Sun, HeartHandshake } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  return (
    <div id="home-view" className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* 1. Hero Section */}
      <section id="hero" className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1432406186267-e8035262046a?auto=format&fit=crop&q=80&w=1400" 
            alt="Pristine jungle waterfall cascade" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 filter brightness-75 transform transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-forest-900/40 to-warm-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white select-none">
          <span className="inline-block px-4 py-1.5 bg-forest-900/60 backdrop-blur-md text-warm-200 text-xs font-mono font-medium tracking-widest uppercase rounded-full mb-6 border border-forest-500/30">
            ✦ Vile Village Hidden sanctuary ✦
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-sm leading-tight">
            Secret Place Waterfall
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-warm-100 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow">
            Immerse yourself of pristine cascading water. Let the deep rhythm of ancient forests rejuvenate your spirit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              id="hero-cta-book"
              onClick={() => setActiveTab('booking')}
              className="w-full sm:w-auto px-8 py-4 bg-forest-600 text-warm-50 font-semibold rounded-xl hover:bg-forest-500 hover:scale-102 active:scale-98 shadow-xl transition-all duration-200"
            >
              Secure Spot (₹300/Person)
            </button>
            <button
              id="hero-cta-activities"
              onClick={() => setActiveTab('activities')}
              className="w-full sm:w-auto px-8 py-4 bg-white/25 backdrop-blur-md text-white border border-white/45 font-medium rounded-xl hover:bg-white/35 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Explore Adventures</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Absolute bottom overlay for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-50 to-transparent pointer-events-none" />
      </section>

      {/* 2. Welcome & Eco-Friendly Section */}
      <section id="eco-friendly" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-forest-600 uppercase">
                Sustainable Eco-Tourism Mandate
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest-900">
                100% Natural and Eco-Friendly Care
              </h3>
            </div>
            
            <p className="text-forest-800 text-base sm:text-lg leading-relaxed font-light">
              We stand as keepers of this canyon. Every path, bridge, and rope structure has been laid using natural deadwoods and local vines, avoiding synthetic compounds to safeguard our micro-aquatic life.
            </p>

            {/* List with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
                  <Compass className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-sm text-forest-900">Indigenous Flora</h4>
                <p className="text-xs text-forest-600 leading-normal">
                  Strictly local species preservation. No invasive landscaping.
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-sm text-forest-900">Zero Commercial Waste</h4>
                <p className="text-xs text-forest-600 leading-normal">
                  All visitor items are registered and inspected for single-use paper compost options.
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-sm text-forest-900">Tribal Hospitality</h4>
                <p className="text-xs text-forest-600 leading-normal">
                  Fulfilling, quiet personal tours designed by Vile Village indigenous caretakers.
                </p>
              </div>
            </div>
          </div>

          {/* Visual block */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-forest-200 to-warm-200 rounded-3xl -rotate-2 scale-102" />
            <div className="relative bg-warm-100 rounded-2xl overflow-hidden shadow-xl border border-forest-100">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700" 
                alt="Smiling local guide welcome" 
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover object-top"
              />
              <div className="p-6 bg-forest-900 text-white space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-serif font-semibold text-base text-warm-50">Guide Lorena Tagalog</h5>
                    <p className="text-xs text-forest-300">Certified Park Ranger</p>
                  </div>
                  <span className="px-3 py-1 bg-forest-800 text-xs font-mono text-warm-200 rounded-full border border-forest-700">
                    Active
                  </span>
                </div>
                <p className="text-sm font-light text-forest-200 italic leading-snug">
                  &ldquo;We don&apos;t own this waterfall; we only keep it safe for our grandchildren. When you step here, you walk with our ancestors.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Adventure Awaits Component Grid */}
      <section id="activities-overview" className="bg-forest-100/50 py-16 border-y border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
              Curated Wild Encounters
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest-900">
              Adventure Awaits You
            </h3>
            <p className="text-forest-700 text-sm sm:text-base font-light">
              From adrenaline-packed jumps into the canyon gorge to lazy, refreshing dips in sun-dappled mountain springs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Waterfall Jumping */}
            <div className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=500" 
                  alt="Waterfall Cliff Jumping" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-forest-900/80 backdrop-blur-md text-warm-100 text-xs font-mono rounded-lg">
                  Adrenaline
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-forest-900">Waterfall Jumping</h4>
                  <p className="text-xs text-forest-600 leading-relaxed font-light">
                    Test your bravery diving safely from natural rock plateaus into deep, tested impact zones. Range: 3m - 10m.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className="text-xs font-semibold text-forest-700 inline-flex items-center group pt-3 self-start hover:text-forest-900"
                >
                  <span>Learn height levels</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Natural Swimming */}
            <div className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=500" 
                  alt="Natural Lagoon Swims" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-forest-900/80 backdrop-blur-md text-warm-100 text-xs font-mono rounded-lg">
                  Relaxation
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-forest-900">Natural Swimming</h4>
                  <p className="text-xs text-forest-600 leading-relaxed font-light">
                    Pristine mountain mineral waters sculpted by natural stones. Rejuvenate beneath cooling moss-covered branches.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className="text-xs font-semibold text-forest-700 inline-flex items-center group pt-3 self-start hover:text-forest-900"
                >
                  <span>Check pool maps</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Exploration Trails */}
            <div className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=500" 
                  alt="Forest Jungle Trek" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-forest-900/80 backdrop-blur-md text-warm-100 text-xs font-mono rounded-lg">
                  Discovery
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-forest-900">Exploration Trails</h4>
                  <p className="text-xs text-forest-600 leading-relaxed font-light">
                    Hike through high-canopy woodlands populated with rich local flora, streams, and pristine fern meadows.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('activities')}
                  className="text-xs font-semibold text-forest-700 inline-flex items-center group pt-3 self-start hover:text-forest-900"
                >
                  <span>See trekking routes</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Custom Private Tours */}
            <div className="bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=500" 
                  alt="Private Guided Wilderness Walk" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-forest-900/80 backdrop-blur-md text-warm-100 text-xs font-mono rounded-lg">
                  Exclusive
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-forest-900">Custom Private Tours</h4>
                  <p className="text-xs text-forest-600 leading-relaxed font-light">
                    For groups, events, or dedicated photographers demanding exclusive access and catered native village meals.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="text-xs font-semibold text-forest-700 inline-flex items-center group pt-3 self-start hover:text-forest-900"
                >
                  <span>Enquire now</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Your Safety is Our Soul Section */}
      <section id="safety-highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl overflow-hidden shadow-2xl relative text-white border border-forest-800">
          {/* Subtle background abstract circle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 sm:p-12 md:p-16 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-warm-300 to-forest-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-forest-950 p-4 rounded-2xl border border-forest-700 max-w-[280px]">
                  <img 
                    src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=400" 
                    alt="Standard issue high float lifejacket equipment" 
                    className="w-full h-64 object-cover rounded-xl filter contrast-105"
                  />
                  <div className="mt-3 text-center">
                    <span className="text-xs font-mono text-warm-300 uppercase tracking-widest">
                      Standard Security Issue
                    </span>
                    <p className="text-sm font-bold text-white mt-1">High buoyancy flotation vest</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-warm-300 uppercase tracking-widest flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1.5" />
                  Your Well-being First
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Your Safety is Our Soul
                </h3>
              </div>
              
              <p className="text-forest-200 text-sm sm:text-base font-light leading-relaxed">
                We believe physical safety establishes the calm mind necessary to connect with the woods. That is why safety gear isn&apos;t just an afterthought—it is inspected and sanitized after every single trek. Our guards are certified in swift water navigation and outdoor trauma response.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 bg-forest-950/40 p-4 rounded-xl border border-forest-800">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif font-semibold text-sm text-white">Premium Lifejackets</h5>
                    <p className="text-xs text-forest-300 mt-0.5 font-light">Custom sizes available for toddlers up to 130kg adults.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-forest-950/40 p-4 rounded-xl border border-forest-800">
                  <HeartHandshake className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif font-semibold text-sm text-white">Rangers at Every Lift</h5>
                    <p className="text-xs text-forest-300 mt-0.5 font-light">Double safety watch at waterfall take-offs and deep canyon pools.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Voices from the Valley Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
            Traveler Diaries
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest-900">
            Voices from the Valley
          </h3>
          <p className="text-forest-700 text-sm font-light">
            Genuine testaments from visitors who treaded lightly and took away everlasting natural memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm font-light text-forest-800 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-forest-50 mt-6">
                <img 
                  src={t.avatarUrl} 
                  alt={t.author} 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <h5 className="text-xs font-semibold text-forest-900">{t.author}</h5>
                  <p className="text-[10px] text-forest-500 font-mono uppercase">{t.role} • {t.visitDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Find Your Way To The Heart Map Placeholder */}
      <section id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-warm-100 rounded-3xl p-8 border border-forest-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase flex items-center">
              <Map className="h-4 w-4 mr-1.5 text-forest-500" />
              Trek Navigation
            </span>
            <h3 className="font-serif text-3xl font-bold tracking-tight text-forest-900">
               Find Your Way to the Heart
            </h3>
            <p className="text-sm text-forest-800 leading-relaxed font-light">
              Nestled deep in the valley of Purok 4, Vile Village. Cell networks dim about 3km before the entrance—please download offline maps or write down direction instructions. Standard shuttle picks up booked tourists from the main village chapel gate.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center text-xs text-forest-700">
                <span className="h-2 w-2 rounded-full bg-forest-600 mr-2" />
                <span>2 hours drive from City Central</span>
              </div>
              <div className="flex items-center text-xs text-forest-700">
                <span className="h-2 w-2 rounded-full bg-forest-600 mr-2" />
                <span>Complimentary solar cart parking at general entry gate</span>
              </div>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => setActiveTab('contact')}
                className="px-5 py-2.5 bg-forest-800 text-warm-50 text-xs font-semibold rounded-xl hover:bg-forest-950 transition-colors inline-flex items-center space-x-1.5"
              >
                <span>Access Interactive Directions Map</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 h-72 lg:h-80 bg-warm-200 rounded-2xl relative overflow-hidden shadow-inner border border-forest-150">
            {/* Visual Vector Map representation representing village, mountains and waterfall */}
            <div className="absolute inset-0 bg-[#eef1ed] flex items-center justify-center p-4">
              
              {/* Natural map design circles, roads and icons */}
              <div className="absolute h-96 w-96 border border-dashed border-forest-300 rounded-full opacity-30 animate-pulse" />
              <div className="absolute h-64 w-64 border border-dashed border-forest-300 rounded-full opacity-50" />
              
              {/* Curved pathways */}
              <svg className="absolute inset-0 w-full h-full text-forest-300/60 stroke-2 fill-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 100 Q 150 50, 300 180 T 600 240" />
                <path d="M 200 0 Q 350 200, 200 350" strokeDasharray="5,5" strokeWidth="1.5" className="text-forest-400" />
              </svg>

              {/* Map Pins */}
              <div className="absolute left-[20%] top-[40%] text-center">
                <div className="h-6 w-6 rounded-full bg-warm-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow animate-bounce">
                  🚩
                </div>
                <span className="text-[10px] font-mono text-warm-800 font-semibold mt-1 block">Village Chapel Gateway</span>
              </div>

              <div className="absolute right-[30%] top-[30%] text-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-forest-600 blur opacity-40 animate-ping" />
                  <div className="h-8 w-8 rounded-full bg-forest-700 border-2 border-white flex items-center justify-center text-white text-xs shadow-lg">
                    🌊
                  </div>
                </div>
                <span className="text-[10px] font-mono text-forest-950 font-bold mt-1 block tracking-tight bg-warm-50/80 px-1.5 py-0.5 rounded border border-forest-200">
                  Secret Place Waterfall
                </span>
              </div>

              <div className="absolute left-[54%] bottom-[20%] text-center">
                <div className="h-5 w-5 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-white text-[9px] shadow">
                  ⛺
                </div>
                <span className="text-[9px] font-mono text-forest-800 mt-1 block">Ranger Basecamp</span>
              </div>

              {/* Small HUD marker overlay */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg border border-forest-200 text-[10px] font-mono text-forest-800 space-y-0.5">
                <div className="flex justify-between space-x-2">
                  <span className="font-semibold text-forest-950">LAT:</span>
                  <span>14.1592° N</span>
                </div>
                <div className="flex justify-between space-x-2">
                  <span className="font-semibold text-forest-950">LNG:</span>
                  <span>121.2356° E</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
