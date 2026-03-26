
// This file mirrors the Prisma Schema for frontend usage.
// It ensures that API responses match the UI expectations.

export type Difficulty = 'Easy' | 'Moderate' | 'Hard';
export type TourType = 'Luxury' | 'Budget' | 'Mid-range' | 'Expedition';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Country {
  id: number;
  name: string;
  code: string;
  rating: number;
  description?: string;
  imageUrl?: string; // Added for frontend display
}

export interface Park {
  id: number;
  name: string;
  countryId: number;
  description?: string;
  bestTimeFrom?: string;
  bestTimeTo?: string;
  minPricePerDay?: number;
  imageUrl?: string;
}

export interface TourOperator {
  id: number;
  name: string;
  description?: string;
  website?: string;
  rating: number;
  verified: boolean;
  fleets?: number; // For dashboard
  bookingsProcessed?: number; // For dashboard
}

export interface Safari {
  id: number;
  title: string;
  slug: string;
  description?: string;
  duration: number; // Days
  pricePerPersonMin: number;
  pricePerPersonMax: number;
  currency: string;
  maxGroupSize?: number;
  difficulty?: Difficulty;
  tourType?: TourType;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  itinerary?: any; // JSON
  
  // Relations
  country?: Country;
  operator?: TourOperator;
  parks?: Park[];
}

export interface BookingGuest {
  firstName: string;
  lastName: string;
  nationality?: string;
}

export interface Booking {
  id?: number;
  bookingNumber?: string;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  status: BookingStatus;
  totalPrice?: number;
  currency: string;
  specialRequests?: string;
  guests: BookingGuest[];
}
