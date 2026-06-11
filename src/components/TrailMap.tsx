import React, { useState } from 'react';
import { Compass, Eye, ShieldAlert, Navigation, Layers, Play, Pause, RotateCw, CheckSquare, Sparkles, MapPin, TreePine, Mountain } from 'lucide-react';

interface Trail {
  id: string;
  name: string;
  distance: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  desc: string;
  color: string;
  gradient: string;
  pathId: string;
  waypoints: {
    name: string;
    distance: string;
    description: string;
    elevation: number;
    coords: { x: number; y: number };
    alert?: string;
  }[];
  elevationProfile: { dist: number; elev: number }[];
  packing: string[];
}

export default function TrailMap() {
  const [selectedTrailId, setSelectedTrailId] = useState<string>('local-trail');
  const [activeWaypointIdx, setActiveWaypointIdx] = useState<number>(0);
  const [simulationProgress, setSimulationProgress] = useState<number | null>(null);
  const [simulationIntervalId, setSimulationIntervalId] = useState<any | null>(null);
  const [simulatedWaypointIndex, setSimulatedWaypointIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 3 Custom trails
  const trails: Trail[] = [
    {
      id: 'local-trail',
      name: 'Vile Village Local Trail',
      distance: '1.8 km',
      time: '1 Hour',
      difficulty: 'Easy',
      desc: 'Ideal for photography, winding through flat forest floors alongside safe streams. Suitable for all fitness levels.',
      color: '#10b981', // emerald-500
      gradient: 'from-emerald-500 to-teal-600',
      pathId: 'localPath',
      waypoints: [
        {
          name: 'Purok 4 Gateway Check',
          distance: '0.0 km',
          description: 'Base ranger registration point and standard gear check.',
          elevation: 120,
          coords: { x: 50, y: 350 },
        },
        {
          name: 'Giant Green Bamboo Dome',
          distance: '0.6 km',
          description: 'Quiet pathways arched with ancient green giant bamboo stalks.',
          elevation: 135,
          coords: { x: 180, y: 320 },
        },
        {
          name: 'Orchid Creek Crossing',
          distance: '1.2 km',
          description: 'A flat volcanic rock bridge. Keep an eye out for rare endemic butterflies here.',
          elevation: 145,
          coords: { x: 300, y: 310 },
        },
        {
          name: 'Riverside Pebble Haven',
          distance: '1.8 km',
          description: 'Flat, sandy cove bordering crystal pools. Perfect spot to enjoy cold spring water.',
          elevation: 150,
          coords: { x: 420, y: 280 },
          alert: 'Be mindful of slippery river pebbles.'
        }
      ],
      elevationProfile: [
        { dist: 0.0, elev: 120 },
        { dist: 0.3, elev: 128 },
        { dist: 0.6, elev: 135 },
        { dist: 0.9, elev: 140 },
        { dist: 1.2, elev: 145 },
        { dist: 1.5, elev: 148 },
        { dist: 1.8, elev: 150 }
      ],
      packing: ['Standard trainers', 'Water bottle (refillable)', 'Insect repellent', 'Lightweight waterproof pouch']
    },
    {
      id: 'canopy-track',
      name: 'Canopy Track',
      distance: '2.5 km',
      time: '1.5 Hours',
      difficulty: 'Moderate',
      desc: 'Offers spectacular views from ancient rope-suspended hanging bridges high up in Giant moss ferns.',
      color: '#f59e0b', // amber-500
      gradient: 'from-amber-500 to-orange-600',
      pathId: 'canopyPath',
      waypoints: [
        {
          name: 'Purok 4 Gateway Check',
          distance: '0.0 km',
          description: 'Base ranger registration point and standard gear check.',
          elevation: 120,
          coords: { x: 50, y: 350 },
        },
        {
          name: 'Mossy Fern Ladder',
          distance: '0.8 km',
          description: 'A series of steady, timber steps going through high canopy layers.',
          elevation: 190,
          coords: { x: 190, y: 220 },
          alert: 'Slightly high gradient. Take deep slow breaths.'
        },
        {
          name: 'Twin Hanging Canopy Bridges',
          distance: '1.7 km',
          description: 'Two suspension rope bridges over a 40 meter drop with a close-up panorama of mist-sprayed gorge.',
          elevation: 215,
          coords: { x: 340, y: 160 },
          alert: 'Strict limit of 4 hikers at a time on the bridge.'
        },
        {
          name: 'Gorge Bird-Watching Hub',
          distance: '2.5 km',
          description: 'Wooden viewing platform above the forest canopy. Binoculars available.',
          elevation: 230,
          coords: { x: 480, y: 130 },
        }
      ],
      elevationProfile: [
        { dist: 0.0, elev: 120 },
        { dist: 0.4, elev: 150 },
        { dist: 0.8, elev: 190 },
        { dist: 1.2, elev: 200 },
        { dist: 1.7, elev: 215 },
        { dist: 2.1, elev: 222 },
        { dist: 2.5, elev: 230 }
      ],
      packing: ['Trail shoes with grip', 'Action camera', 'Rope gloves', 'Eco water flask']
    },
    {
      id: 'monsoon-ascent',
      name: 'Monsoon Ascent',
      distance: '3.4 km',
      time: '2.5 Hours',
      difficulty: 'Challenging',
      desc: 'Climbs through muddy hills and root steps to the high-view watchtower. Incredible panoramic views of Vile Canyon.',
      color: '#ef4444', // rose-500
      gradient: 'from-rose-500 to-red-700',
      pathId: 'monsoonPath',
      waypoints: [
        {
          name: 'Purok 4 Gateway Check',
          distance: '0.0 km',
          description: 'Base ranger registration point and standard gear check.',
          elevation: 120,
          coords: { x: 50, y: 350 },
        },
        {
          name: 'Volcanic Core Giant Stepway',
          distance: '1.1 km',
          description: 'Exposed dark volcanic basalt rock steps, naturally polished and moist. Sturdy boots highly advised.',
          elevation: 210,
          coords: { x: 160, y: 180 },
          alert: 'Wet surfaces. Focus on three points of contact.'
        },
        {
          name: 'Monsoon Flow Creek Crossing',
          distance: '2.2 km',
          description: 'A rushing mountain stream crossed via heavy guide cables. Water is waist-high during cloudbursts.',
          elevation: 275,
          coords: { x: 310, y: 120 },
          alert: 'Check the safety gauge at the bank before trekking across.'
        },
        {
          name: 'Warden Watchtower Peak',
          distance: '3.4 km',
          description: 'Highest geographic view of Vile Village and cascading waterfalls. Elevation is 340 meters.',
          elevation: 340,
          coords: { x: 450, y: 50 },
        }
      ],
      elevationProfile: [
        { dist: 0.0, elev: 120 },
        { dist: 0.6, elev: 170 },
        { dist: 1.1, elev: 210 },
        { dist: 1.8, elev: 250 },
        { dist: 2.2, elev: 275 },
        { dist: 2.8, elev: 310 },
        { dist: 3.4, elev: 340 }
      ],
      packing: ['Sturdy hiking boots', 'Waterproof poncho/rain gear', 'Electrolytes packet', 'Emergency whistle']
    }
  ];

  const currentTrail = trails.find(t => t.id === selectedTrailId) || trails[0];

  const getDifficultyBadgeColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';
      case 'Moderate': return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
      case 'Challenging': return 'bg-rose-500/10 text-rose-500 border-rose-500/25';
      default: return 'bg-forest-500/10 text-forest-500 border-forest-500/25';
    }
  };

  // Manage checklist items
  const handleToggleCheck = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(i => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  // Interactive path simulation
  const handleStartSimulation = () => {
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId);
      setSimulationIntervalId(null);
      setSimulationProgress(null);
      return;
    }

    setSimulationProgress(0);
    setSimulatedWaypointIndex(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationIntervalId(null);
          return 100;
        }
        
        const nextProgress = prev + 5;
        // Map progress percentage to waypoints
        const waypointBoundary = 100 / (currentTrail.waypoints.length - 1);
        const nextWpIdx = Math.min(
          currentTrail.waypoints.length - 1,
          Math.floor(nextProgress / waypointBoundary)
        );
        setSimulatedWaypointIndex(nextWpIdx);
        
        return nextProgress;
      });
    }, 300);

    setSimulationIntervalId(interval);
  };

  const handleResetSimulation = () => {
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId);
      setSimulationIntervalId(null);
    }
    setSimulationProgress(null);
    setSimulatedWaypointIndex(0);
  };

  return (
    <div id="trail-map-section" className="bg-forest-950 text-white rounded-3xl p-6 sm:p-8 border border-forest-800 shadow-2xl space-y-8 overflow-hidden relative">
      {/* Absolute decor lines */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forest-800/80 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-emerald-400 animate-spin-slow" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              Interactive Orienteering Modules
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Virtual Trail Ranger Map
          </h3>
          <p className="text-xs sm:text-sm text-forest-300 font-light max-w-xl">
            Simulate your jungle route coordinates, review elevation gradients, and double-check your custom equipment packing guidelines.
          </p>
        </div>

        {/* Trail Select Tabs */}
        <div className="flex flex-wrap gap-2 bg-forest-900/60 p-1.5 rounded-2xl border border-forest-800 shrink-0">
          {trails.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTrailId(t.id);
                setActiveWaypointIdx(0);
                handleResetSimulation();
              }}
              className={`px-4 py-2 text-xs font-serif font-bold rounded-xl transition-all cursor-pointer ${
                selectedTrailId === t.id 
                  ? 'bg-forest-700 text-white shadow-md border border-forest-600' 
                  : 'text-forest-400 hover:text-white hover:bg-forest-800/50'
              }`}
            >
              {t.name.split(' ')[0] + ' ' + (t.name.split(' ')[1] || '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Interactive Vector Topography Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-forest-900/40 rounded-2xl p-4 border border-forest-800/80 overflow-hidden">
            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 bg-forest-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-forest-800 text-[10px] space-y-1 index-30">
              <span className="block font-mono text-forest-300 font-bold uppercase tracking-wider mb-1.5 border-b border-forest-800 pb-1">
                Map Landmarks
              </span>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-forest-100 font-light">Purok 4 base</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span className="text-forest-100 font-light">Waterfalls & Pools</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 bg-yellow-500 rounded-sm" />
                <span className="text-forest-100 font-light">Watchtowers</span>
              </div>
            </div>

            {/* Simulated Travel Info Bar */}
            {simulationProgress !== null && (
              <div className="absolute bottom-4 left-4 right-4 bg-forest-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-emerald-400 animate-bounce" />
                  <span>
                    Simulating: <strong className="text-emerald-400">{currentTrail.waypoints[simulatedWaypointIndex].name}</strong>
                  </span>
                </div>
                <span>
                  Progress: <strong>{simulationProgress}%</strong>
                </span>
              </div>
            )}

            {/* SVG Interactive Canvas */}
            <svg 
              className="w-full h-[320px] sm:h-[380px] bg-forest-950/80 rounded-xl"
              viewBox="0 0 550 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definition tags */}
              <defs>
                <linearGradient id="localGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="canopyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="monsoonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#f87171" />
                </linearGradient>

                <pattern id="grid" width="40" widthUnits="userSpaceOnUse" height="40" heightUnits="userSpaceOnUse" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 185, 129, 0.04)" strokeWidth="1"/>
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Topography concentric lines */}
              <path d="M -50 420 Q 80 320 220 420" fill="none" stroke="rgba(16, 185, 129, 0.04)" strokeWidth="3" />
              <path d="M -50 450 Q 80 290 220 450" fill="none" stroke="rgba(16, 185, 129, 0.04)" strokeWidth="3" />
              
              <path d="M 300 -50 C 420 120 280 250 580 180" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="2" />
              <path d="M 320 -80 C 440 100 300 230 600 160" fill="none" stroke="rgba(16, 185, 129, 0.04)" strokeWidth="2" />
              <path d="M 340 -110 C 460 80 320 210 620 140" fill="none" stroke="rgba(16, 185, 129, 0.03)" strokeWidth="2" />

              {/* River Blue Corridor SVG */}
              <path 
                d="M -20 380 Q 150 320 280 300 T 400 240 T 450 150 T 465 -20" 
                fill="none" 
                stroke="rgba(14, 165, 233, 0.18)" 
                strokeWidth="18" 
                strokeLinecap="round" 
              />
              <path 
                d="M -20 380 Q 150 320 280 300 T 400 240 T 450 150 T 465 -20" 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="4" 
                strokeOpacity="0.5"
                strokeLinecap="round" 
              />
              
              {/* Waterfall Symbol */}
              <g transform="translate(450, 140)">
                <path d="M-5,-10 L5,-10 L8,30 L-8,30 Z" fill="#0284c7" opacity="0.3" filter="blur(2px)" />
                <path d="M-4,-10 L4,-10 L6,28 L-6,28 Z" fill="#38bdf8" opacity="0.8" />
                <circle cx="0" cy="30" r="8" fill="#e0f2fe" opacity="0.4" filter="blur(3px)" />
                <text x="12" y="15" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Primary Leap</text>
              </g>

              {/* Dam Symbol */}
              <g transform="translate(280, 298) rotate(15)">
                <rect x="-15" y="-4" width="30" height="8" rx="2" fill="#52525b" />
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#a1a1aa" strokeWidth="2" />
                <text x="-35" y="-12" fill="#a1a1aa" fontSize="9" fontFamily="monospace">Village Dam</text>
              </g>

              {/* Trail Paths */}
              {/* Local Trail - Emerald */}
              <path 
                id="localPath"
                d="M 50 350 Q 115 335 180 320 T 300 310 T 420 280" 
                fill="none" 
                stroke={selectedTrailId === 'local-trail' ? 'url(#localGrad)' : '#10b981'} 
                strokeWidth={selectedTrailId === 'local-trail' ? 5 : 2}
                strokeOpacity={selectedTrailId === 'local-trail' ? 1.0 : 0.25}
                strokeDasharray={selectedTrailId !== 'local-trail' ? '4,4' : undefined}
                className="transition-all duration-300"
              />

              {/* Canopy Track - Amber */}
              <path 
                id="canopyPath"
                d="M 50 350 Q 120 285 190 220 T 340 160 T 480 130" 
                fill="none" 
                stroke={selectedTrailId === 'canopy-track' ? 'url(#canopyGrad)' : '#f59e0b'} 
                strokeWidth={selectedTrailId === 'canopy-track' ? 5 : 2}
                strokeOpacity={selectedTrailId === 'canopy-track' ? 1.0 : 0.25}
                strokeDasharray={selectedTrailId !== 'canopy-track' ? '4,4' : undefined}
                className="transition-all duration-300"
              />

              {/* Monsoon Ascent - Rose */}
              <path 
                id="monsoonPath"
                d="M 50 350 Q 105 265 160 180 T 310 120 T 450 50" 
                fill="none" 
                stroke={selectedTrailId === 'monsoon-ascent' ? 'url(#monsoonGrad)' : '#ef4444'} 
                strokeWidth={selectedTrailId === 'monsoon-ascent' ? 5 : 2}
                strokeOpacity={selectedTrailId === 'monsoon-ascent' ? 1.0 : 0.25}
                strokeDasharray={selectedTrailId !== 'monsoon-ascent' ? '4,4' : undefined}
                className="transition-all duration-300"
              />

              {/* Waypoints of CURRENT active trail */}
              {currentTrail.waypoints.map((wp, wIdx) => {
                const isActive = activeWaypointIdx === wIdx;
                const isSimulatedActive = simulationProgress !== null && simulatedWaypointIndex === wIdx;
                
                return (
                  <g 
                    key={wIdx} 
                    className="cursor-pointer group"
                    onClick={() => {
                      setActiveWaypointIdx(wIdx);
                      handleResetSimulation();
                    }}
                  >
                    {/* Ring highlight */}
                    <circle 
                      cx={wp.coords.x} 
                      cy={wp.coords.y} 
                      r={isActive || isSimulatedActive ? 12 : 7} 
                      fill="none" 
                      stroke={currentTrail.color} 
                      strokeWidth={2}
                      className={`transition-all duration-300 ${
                        isActive || isSimulatedActive ? 'stroke-white animate-pulse' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                    {/* Inner core circle */}
                    <circle 
                      cx={wp.coords.x} 
                      cy={wp.coords.y} 
                      r={isActive || isSimulatedActive ? 6 : 4} 
                      fill={isActive || isSimulatedActive ? '#ffffff' : currentTrail.color} 
                      className="transition-all duration-300"
                    />
                    
                    {/* Labels with nice background */}
                    <text 
                      x={wp.coords.x} 
                      y={wp.coords.y - 14} 
                      fill={isActive ? '#ffffff' : '#9ca3af'}
                      fontSize="9" 
                      fontFamily="monospace"
                      fontWeight={isActive ? 'bold' : 'normal'}
                      textAnchor="middle"
                      className="transition-colors duration-200 select-none bg-forest-950"
                    >
                      {wp.name.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                );
              })}

              {/* Moving Backpacker Icon during Simulation */}
              {simulationProgress !== null && (() => {
                const stepLength = currentTrail.waypoints.length;
                const activeWp = currentTrail.waypoints[simulatedWaypointIndex];
                return (
                  <g transform={`translate(${activeWp.coords.x}, ${activeWp.coords.y})`}>
                    <circle cx="0" cy="0" r="16" fill="rgba(255, 255, 255, 0.15)" stroke="#67e8f9" strokeWidth="1" className="animate-ping" />
                    <circle cx="0" cy="0" r="6" fill="#38bdf8" />
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Simulation Controllers */}
          <div className="flex items-center justify-between bg-forest-900/40 p-4 rounded-xl border border-forest-800 text-xs">
            <span className="text-forest-300 font-mono">
              GPS Navigation Telemetry
            </span>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleStartSimulation}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                  simulationIntervalId 
                    ? 'bg-rose-500/20 hover:bg-rose-500/35 text-rose-300' 
                    : 'bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300'
                }`}
              >
                {simulationIntervalId ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause Sim</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Play Sim</span>
                  </>
                )}
              </button>

              <button 
                onClick={handleResetSimulation}
                className="flex items-center space-x-1.5 bg-forest-800 hover:bg-forest-700 font-mono text-forest-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Waypoint Logs, Profile chart, and Gear checklists */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Waypoint details log card */}
          {(() => {
            const displayWpIdx = simulationProgress !== null ? simulatedWaypointIndex : activeWaypointIdx;
            const wp = currentTrail.waypoints[displayWpIdx];
            if (!wp) return null;
            return (
              <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    Waypoint {displayWpIdx + 1} of {currentTrail.waypoints.length}
                  </span>
                  <span className="text-xs font-serif font-semibold text-emerald-300">
                    {wp.distance} Mark
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white flex items-center">
                    <MapPin className="h-4.5 w-4.5 text-rose-500 mr-2 shrink-0 animate-bounce" />
                    {wp.name}
                  </h4>
                  <p className="text-xs text-forest-200 leading-relaxed font-light">
                    {wp.description}
                  </p>
                </div>

                {/* Altitude Indicator */}
                <div className="bg-forest-950/70 p-3 rounded-lg flex items-center justify-between text-xs font-mono text-forest-300 border border-forest-850">
                  <span className="flex items-center text-forest-400">
                    <Mountain className="h-4 w-4 mr-1.5 text-emerald-500" />
                    Alt Altitude Gradients:
                  </span>
                  <span className="text-emerald-400 font-bold">{wp.elevation} meters</span>
                </div>

                {/* Ranger alert flag */}
                {wp.alert && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start space-x-2">
                    <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-rose-300 leading-snug">
                      <strong>Guard Notice:</strong> {wp.alert}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Custom Trail Altitude Elevation Profile Cross-section Chart */}
          <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
              Elevation Profile cross-section
            </span>
            
            <div className="h-28 flex items-end justify-between gap-1 pt-4 relative">
              {/* SVG crossline backdrop */}
              <div className="absolute left-0 right-0 top-1/2 border-t border-forest-800/60 dash-array-2 pointer-events-none" />
              
              {currentTrail.elevationProfile.map((ep, eIdx) => {
                const maxElev = 350;
                const minElev = 100;
                const percentHeight = ((ep.elev - minElev) / (maxElev - minElev)) * 100;
                return (
                  <div 
                    key={eIdx} 
                    className="flex-grow flex flex-col items-center group relative cursor-pointer"
                  >
                    {/* Tooltip */}
                    <span className="absolute -top-6 opacity-0 group-hover:opacity-100 bg-forest-950 text-[9px] font-mono whitespace-nowrap px-2 py-0.5 rounded border border-forest-700 pointer-events-none transition-all">
                      {ep.elev}m @ {ep.dist}k
                    </span>
                    <div 
                      style={{ height: `${Math.max(10, percentHeight)}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        currentTrail.id === 'local-trail' ? 'bg-emerald-500/40 hover:bg-emerald-400' :
                        currentTrail.id === 'canopy-track' ? 'bg-amber-500/40 hover:bg-amber-400' :
                        'bg-rose-500/40 hover:bg-rose-400'
                      }`}
                    />
                    <span className="text-[8px] font-mono text-forest-500 mt-1">
                      {ep.dist}k
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] text-forest-400 font-mono">
              <span>Start: 120m</span>
              <span>Max Altitude: {Math.max(...currentTrail.elevationProfile.map(e => e.elev))}m</span>
            </div>
          </div>

          {/* Required packing list check */}
          <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-3.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
              Required Personal Safety Gear Checklist
            </span>
            
            <div className="space-y-2.5">
              {currentTrail.packing.map((gear, idx) => {
                const hasItem = checkedItems.includes(gear);
                return (
                  <div 
                    key={idx}
                    onClick={() => handleToggleCheck(gear)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      hasItem 
                        ? 'bg-forest-950/80 border-emerald-500/45 text-forest-200' 
                        : 'bg-forest-950/30 border-forest-800 hover:border-forest-700 text-white'
                    }`}
                  >
                    <span className="text-xs font-light">{gear}</span>
                    <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-all ${
                      hasItem ? 'bg-emerald-500 border-emerald-400 text-forest-950' : 'border-forest-600'
                    }`}>
                      {hasItem && (
                        <svg className="h-3 w-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-forest-400">
              <span>Verified status: {checkedItems.length} of {currentTrail.packing.length} ready</span>
              {checkedItems.length === currentTrail.packing.length && (
                <span className="text-emerald-400 flex items-center">
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> Ready to Hike
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
