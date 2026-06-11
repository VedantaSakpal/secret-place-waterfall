import React from 'react';
import { ShieldAlert, Leaf, Heart, Users, Calendar, Trees } from 'lucide-react';
import { VILLAGE_TEAM } from '../data';

export default function AboutView() {
  const faqs = [
    {
      q: 'When is the waterfall at its maximum beauty or monsoon state?',
      a: 'The Secret Place Waterfall relies entirely on natural mountain headwaters. This means the water cascades gracefully all year round, but is particularly lush with mist during the monsoon transition months (June to October). Check our real-time mist weather indicator before trekking!'
    },
    {
      q: 'Do I need to be an expert swimmer for cliff jumping?',
      a: 'Absolutely not. All visitors are fitted with state-approved, high-buoyancy flotation vests regardless of their swimming experience. Village lifeguards track every jump and stand ready to assist immediately upon splash.'
    },
    {
      q: 'What is the daily visitor limit?',
      a: 'To guarantee that we tread lightly on the soil and avoid disturbing native nesting birds, the local eco-board enforces a maximum capacity of 80 visitors inside the canyon loop daily. Booking in advance secures your guaranteed permit.'
    },
    {
      q: 'What is the Zero Plastic Policy?',
      a: 'Single-use plastic bottles, snack wrappers, and bags are strictly forbidden within the active waterfall zone. Visitors are provided with woven bamboo canisters or reusable aluminum cups. Our team inspects baggage at the Purok chapel gate.'
    }
  ];

  return (
    <div id="about-view" className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* 1. Header Banner */}
      <section className="bg-forest-100/50 py-12 border-b border-forest-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
            Meet the Wardens
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest-900 leading-tight">
            Guardians of the Sanctuary
          </h2>
          <p className="text-forest-700 text-sm sm:text-base font-light max-w-2xl mx-auto">
            We are a group of indigenous families, wilderness first-responders, and naturalists dedicated to defending the delicate ecosystem of Purok 4, Vile Village.
          </p>
        </div>
      </section>

      {/* 2. Historic Context / Story of Vile Village */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-warm-200 to-forest-200 rounded-3xl rotate-2" />
            <img 
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=700" 
              alt="Pristine green valley nature trees" 
              referrerPolicy="no-referrer"
              className="relative w-full h-[360px] object-cover rounded-2xl shadow-xl border border-forest-100"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              The Heritage of Purok 4
            </h3>
            <p className="text-sm sm:text-base text-forest-800 leading-relaxed font-light">
              For generations, our elders kept the trail to the "Secret Place" a sacred family memory. Only during times of high monsoon heat did we venture down to the cool emerald pools to gather mountain herbs. 
            </p>
            <p className="text-sm sm:text-base text-forest-800 leading-relaxed font-light">
              In 2018, as industrial expansion began bordering near our forest sector, the village youth unified to declare this area an official co-managed eco-reserve. Today, 100% of the funds raised via bookings stay within our community—supporting local schools, maintaining safety equipment, and financing forest re-wilding efforts.
            </p>

            {/* Micro Goals */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-2">
                <Trees className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-forest-900">4,200+ Trees Planted</h4>
                  <p className="text-xs text-forest-500 font-light">Endemic mahogany and fern species returned to dry river beds.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Leaf className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-forest-900">100% Native Staffing</h4>
                  <p className="text-xs text-forest-500 font-light">Every guide is an official registry member of Vile Village.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Village Team Grid */}
      <section className="bg-forest-100/30 py-16 border-y border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
              Field Caretakers
            </span>
            <h3 className="font-serif text-3xl font-semibold tracking-tight text-forest-900">
              The Dedicated Core
            </h3>
            <p className="text-forest-700 text-sm font-light">
              We stand together on the safety lines, welcoming every visitor with the warmth of a local relative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VILLAGE_TEAM.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
              >
                <img 
                  src={member.avatarUrl} 
                  alt={member.name} 
                  referrerPolicy="no-referrer"
                  className="h-28 w-28 rounded-full object-cover mx-auto ring-4 ring-forest-50"
                />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-forest-950">{member.name}</h4>
                  <p className="text-xs font-mono text-forest-500 uppercase tracking-wider">{member.role}</p>
                </div>
                <p className="text-xs text-forest-800 leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Frequently Asked Questions FAQ Accordion template */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
            Have Questions?
          </span>
          <h3 className="font-serif text-3xl font-semibold tracking-tight text-forest-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-warm-100 p-6 rounded-2xl border border-forest-100 space-y-2 hover:border-forest-200 transition-colors"
            >
              <h4 className="font-serif font-semibold text-forest-900 text-sm sm:text-base flex items-start">
                <span className="text-forest-500 mr-2">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-forest-700 font-light leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
