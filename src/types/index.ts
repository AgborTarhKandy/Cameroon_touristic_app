export interface Tour {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  region: string;
  type: 'cultural' | 'wildlife' | 'adventure' | 'eco-tourism';
  diversityTags: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
  included: string[];
  excluded: string[];
  itinerary: DayItinerary[];
  maxGroupSize: number;
  availableDates: string[];
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  preferences: {
    language: 'en' | 'fr';
    interests: string[];
  };
  bookings: Booking[];
  wishlist: string[];
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  tour: Tour;
  startDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  tourId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}