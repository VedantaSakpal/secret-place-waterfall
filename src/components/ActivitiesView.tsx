import React from 'react';
import { Compass, Sparkles, MapPin, CheckCircle, Flame, ShieldAlert, ArrowRight } from 'lucide-react';
import { INITIAL_ACTIVITIES } from '../data';
import TrailMap from './TrailMap';

interface ActivitiesViewProps {
  setActiveTab: (tab: string) => void;
}

export default function ActivitiesView({ setActiveTab }: void | any) {
  
  // Custom detailed data for trails
  const trails = [
    {
      name: 'Vile Village Local Trail',
      distance: '1.8 km',
      time: '1 Hour',
      difficulty: 'Easy',
      desc: 'Ideal for photography, winding through flat forest floors alongside safe streams.'
    },
    {
      name: 'Monsoon Ascent',
      distance: '3.4 km',
      time: '2.5 Hours',
      difficulty: 'Challenging',
      desc: 'Climbs through muddy hills and root steps to the high-view watchtower. Incredible panoramic views.'
    },
    {
      name: 'Canopy Track',
      distance: '2.5 km',
      time: '1.5 Hours',
      difficulty: 'Moderate',
      desc: 'Offers spectacular views from ancient rope-suspended hanging bridges high up in Giant moss ferns.'
    }
  ];

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Challenging':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-forest-100 text-forest-800 border-forest-200';
    }
  };

  return (
    <div id="activities-view" className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* 1. Header Hero Panel */}
      <section className="bg-forest-900 text-white relative py-16 text-center overflow-hidden border-b border-forest-800">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200" 
            alt="Beautiful misty forest canopy" 
            className="w-full h-full object-cover filter brightness-50 opacity-40 scale-102"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono font-semibold tracking-widest text-warm-300 uppercase">
            Active Wild Journeys
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Immersive Adventures in the Wild
          </h2>
          <p className="text-forest-200 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From vertical cliff dives to ancient forest trails, our activities are designed to help you reconnect with natural speeds and native sounds.
          </p>
        </div>
      </section>

      {/* 2. Structured Activities Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {INITIAL_ACTIVITIES.map((act, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={act.id} 
              id={act.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* Media Block */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-forest-200 to-warm-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forest-100">
                    <img 
                      src={act.imageUrl} 
                      alt={act.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-72 sm:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-mono font-medium rounded-full border shadow-sm ${getDifficultyColor(act.difficulty || '')}`}>
                        {act.difficulty}
                      </span>
                      {act.duration && (
                        <span className="bg-forest-900/80 backdrop-blur-sm text-warm-100 px-3 py-1 text-xs font-mono rounded-full border border-forest-700 shadow-sm">
                          {act.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Information Block */}
              <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-forest-600 tracking-wider uppercase font-semibold">
                    Experiential Module {idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    {act.title}
                  </h3>
                </div>

                <p className="text-forest-800 text-sm sm:text-base leading-relaxed font-light">
                  {act.description}
                </p>

                {/* Bullet highlights */}
                {act.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {act.highlights.map((hlt, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4.5 w-4.5 text-forest-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-forest-800 font-light">{hlt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Warning or notes */}
                {act.suitableFor && (
                  <div className="p-4 bg-warm-100 rounded-xl border border-forest-100 flex items-center space-x-3">
                    <ShieldAlert className="h-5 w-5 text-forest-600 shrink-0" />
                    <span className="text-xs text-forest-800">
                      <strong>Age & Fitness Notice:</strong> {act.suitableFor}
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <button 
                    onClick={() => setActiveTab('booking')}
                    className="px-6 py-3 bg-forest-700 hover:bg-forest-800 text-warm-50 text-xs font-semibold rounded-xl tracking-wide transition-colors"
                  >
                    Select this in Booking Pass
                  </button>
                </div>

              </div>

            </div>
          );
        })}

      </section>

      {/* 3. Deep-Dive Forest Trails Grid list */}
      <section className="bg-warm-100 py-16 border-y border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
              Trail Mechanics
            </span>
            <h3 className="font-serif text-3xl font-semibold tracking-tight text-forest-900">
              Verified Trekking Routes
            </h3>
            <p className="text-forest-700 text-sm font-light">
              We catalog trails carefully to match individual cardiovascular capacities and sensory preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {trails.map((trail, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-forest-100 shadow-sm space-y-4 hover:border-forest-300 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-base text-forest-950">{trail.name}</h4>
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full border ${getDifficultyColor(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                </div>
                
                <p className="text-xs text-forest-700 leading-relaxed font-light">{trail.desc}</p>
                
                <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-forest-500 border-t border-forest-50">
                  <div className="flex items-center">
                    <Compass className="h-3.5 w-3.5 mr-1 text-forest-400" />
                    <span>Distance: <strong>{trail.distance}</strong></span>
                  </div>
                  <div>
                    <span>Est. Time: <strong>{trail.time}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Geographic Trail Ranger Map */}
          <TrailMap />

        </div>
      </section>

      {/* 4. CTA for Booking Sanctuary */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-forest-800 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-white/5 rounded-full pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready to Write Your Own Wild Story?</h3>
            <p className="text-forest-200 text-sm font-light max-w-xl mx-auto">
              Spot limits are strictly capped at 80 people per day. Book your entrance pass to avoid getting turned away at the village checkpoint.
            </p>
          </div>
          <div className="pt-2">
            <button 
              onClick={() => setActiveTab('booking')}
              className="px-8 py-3.5 bg-warm-100 hover:bg-white text-forest-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-102 active:scale-98"
            >
              Book Your Sanctuary Spot Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
