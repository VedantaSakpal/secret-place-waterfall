import { Activity, Testimonial, GalleryPost, WeatherData } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-jumping',
    title: 'Waterfall Jumping',
    shortDescription: 'Feel the rush of adrenaline jumping from pristine cliff edges into deep natural emerald pools.',
    description: 'Guided cliff jumping at secure layers ranging from 3 meters to 10 meters height. Complete with state-approved flotation vests and helmet gear, supervised by certified village lifeguards.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000',
    duration: '2-3 Hours',
    difficulty: 'Moderate',
    suitableFor: 'Ages 12+ (Must be accompanied by adult)',
    highlights: [
      'Layered take-off levels (3m, 5m, 8m, and 10m)',
      '1-on-1 visual support and landing instruction from safety guards',
      'Pristine crystal-clear emerald water landing zone',
      'GoPro action snaps included in high category pass'
    ]
  },
  {
    id: 'act-trekking',
    title: 'Forest Trekking',
    shortDescription: 'Trek through high-biodiversity monsoon trails featuring rare exotic flora and giant ferns.',
    description: 'Experience deep immersion in the jungle of Vile Village. Hear the echoes of native bird species and discover hidden tributaries flowing into the main canyon reservoir system.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000',
    duration: '3-4 Hours',
    difficulty: 'Challenging',
    suitableFor: 'Intermediate hikers with basic stamina',
    highlights: [
      'Historical narration of Vile Village and local traditions',
      'Rare spotting of forest butterflies and endemic orchids',
      'Refreshed breathing breaks at the mid-valley canopy watchtower',
      'Eco-souvenir and fresh coconut water at trail exit'
    ]
  },
  {
    id: 'act-swimming',
    title: 'Natural Swimming pools',
    shortDescription: 'Relax in natural volcanic stone pools directly below the primary waterfall cascade.',
    description: 'Let the cool mountain mist and continuous cascading waters massage your shoulders. Rest on shallow rock benches sculpted naturally by centuries of water flow.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000',
    duration: 'No limit',
    difficulty: 'Easy',
    suitableFor: 'Families, non-swimmers with lifejackets',
    highlights: [
      'Subtle mineral-rich natural volcanic water flow',
      'Calm shallow bays safe for kids and seniors',
      'Naturally shaded by giant overhanging moss-rich branches',
      'Direct visual contact with the majestic main waterfall tower'
    ]
  },
  {
    id: 'act-dam',
    title: 'Dam & Nature Exploration',
    shortDescription: 'Venture to the historic stone dam and ancient natural protection barriers.',
    description: 'Learn about the crucial ecosystem balance maintained by our natural dams and water collectors. Observe the rich interaction of local fauna with clean mountain water streams.',
    imageUrl: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=1000',
    duration: '1-2 Hours',
    difficulty: 'Easy',
    suitableFor: 'All nature lovers',
    highlights: [
      'Guided educational walk along the ancient spillway structure',
      'Photography hotspot overlooking the lower green valleys',
      'Bird-watching zone with binocular hires',
      'Educational briefing on village conservation efforts'
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Elena Rostova',
    role: 'Adventure Photographer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    text: 'Secret Place Waterfall is an absolute hidden masterpiece! The local village guides are incredibly gentle souls who protect this gem with genuine love. Cliff jumping from 8 meters was the highlight of my trip to the Philippines.',
    visitDate: 'May 2026'
  },
  {
    id: 't2',
    author: 'Marcus Chen',
    role: 'Solo Backpacker',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    text: 'Treading lightly is real here. They limit visitors to ensure the forest remains untouched, and it makes all the difference. No plastic bottle chaos, just the pure scent of wild orchids, wet earth, and mist.',
    visitDate: 'June 2026'
  },
  {
    id: 't3',
    author: 'Sarah & Dan K.',
    role: 'Eco-Travel Bloggers',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    text: 'Vile Village is doing things right. From standard conservation taxes to well-maintained safety equipment, the booking process was seamless, and the physical security and local care are unmatched. A must-visit!',
    visitDate: 'April 2026'
  }
];

export const INITIAL_GALLERY: GalleryPost[] = [
  {
    id: 'g1',
    author: 'Christian Santos',
    authorRole: 'Village Youth Ambassador',
    date: '2026-06-08',
    title: 'Monsoon Mist Over the Leap',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800',
    description: 'Captured early in the morning when the fog gently settles above the jumping cliffs. The water is at its absolute clearest during this hour.',
    likes: 124,
    likedByMe: false
  },
  {
    id: 'g2',
    author: 'Mei Hayashi',
    authorRole: 'Explore Member',
    date: '2026-06-10',
    title: 'The Hidden Emerald Gorge',
    imageUrl: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=800',
    description: 'A 20-minute swim down the canyon stream rewards you with this magnificent sunburst illuminating the limestone rocks.',
    likes: 89,
    likedByMe: true
  },
  {
    id: 'g3',
    author: 'Chief Ranger Alon',
    authorRole: 'Conservation Warden',
    date: '2026-06-11',
    title: 'Giant Moss Fern Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800',
    description: 'Our re-wilding sector B has completely bloomed with giant sword ferns. Please stick strictly to the marked boardwalks to preserve their fragile spores.',
    likes: 156,
    likedByMe: false
  }
];

export const VILLAGE_TEAM = [
  {
    name: 'Warden Alon Tagalog',
    role: 'Chief Conservation Warden',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Guarding our primary waterfall corridor for over 22 years. Alon manages resource limits and re-wilding.'
  },
  {
    name: 'Lana Soliman',
    role: 'Lead Safety Coordinator',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Certified wilderness first responder and lifevest logistics lead. Rest assured your safety vests are always pristine.'
  },
  {
    name: 'Santi Caparas',
    role: 'Village Coordinator & Guide',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    bio: 'Third generation local who knows every hidden hollow and cliff ledge. santi makes custom private tours unforgettable.'
  }
];

export const INITIAL_WEATHER: WeatherData = {
  condition: 'Light Monsoon Showers',
  temp: 24,
  humidity: 85,
  rainProbability: 65,
  windSpeed: '12 km/h ENE',
  description: 'Water levels are stable and cliff-jumping activities remain fully active. Continuous spray keeps the valley cool.',
  updatedAt: 'Just updated'
};
