export interface Service {
  id: string;
  name: string;
  category: 'cleaning' | 'food' | 'shopping' | 'healthcare';
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  description: string;
  includes: string[];
  image: string;
  status: 'active' | 'inactive';
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  services: string[];
  phone: string;
  verified: boolean;
  location?: { lat: number; lng: number }; // Simulated coords
}

export interface Booking {
  id: string;
  serviceId: string;
  workerId: string;
  date: string;
  time: string;
  status: BookingStatus;
  totalPrice: number;
  address: string;
  recipientName: string;
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  ON_THE_WAY = 'On the Way',
  ARRIVED = 'Arrived',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export type Category = 'All' | 'cleaning' | 'food' | 'shopping' | 'healthcare';
