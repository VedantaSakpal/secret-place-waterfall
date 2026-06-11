export interface Booking {
  id: string;
  fullName: string;
  email: string;
  visitDate: string;
  visitors: number;
  packageName: string;
  totalPrice: number;
  conservationTax: number;
  createdAt: string;
}

export interface GalleryPost {
  id: string;
  author: string;
  authorRole?: string;
  date: string;
  title: string;
  imageUrl: string;
  description: string;
  likes: number;
  likedByMe?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  duration?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  suitableFor?: string;
  highlights?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatarUrl: string;
  rating: number;
  text: string;
  visitDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  sentAt: string;
}

export interface WeatherData {
  condition: string;
  temp: number;
  humidity: number;
  rainProbability: number;
  windSpeed: string;
  description: string;
  updatedAt: string;
}
