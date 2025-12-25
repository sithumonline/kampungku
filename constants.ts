import { Service, Worker } from './types';

export const SERVICES: Service[] = [
  {
    id: "svc-001",
    name: "House Cleaning",
    category: "cleaning",
    price: 80,
    duration: "2-3 hours",
    rating: 4.8,
    reviewCount: 124,
    description: "Professional house cleaning service including floor mopping, dusting, and bathroom cleaning.",
    includes: ["Floor mopping", "Dusting", "Bathroom cleaning", "Kitchen cleaning"],
    image: "https://picsum.photos/400/200?random=1",
    status: "active"
  },
  {
    id: "svc-002",
    name: "Food Preparation",
    category: "food",
    price: 50,
    duration: "1-2 hours",
    rating: 4.9,
    reviewCount: 89,
    description: "Home-cooked meals prepared fresh for elderly family members.",
    includes: ["Meal planning", "Grocery shopping", "Cooking", "Kitchen cleanup"],
    image: "https://picsum.photos/400/200?random=2",
    status: "active"
  },
  {
    id: "svc-003",
    name: "Personal Shopping",
    category: "shopping",
    price: 30,
    duration: "1-2 hours",
    rating: 4.7,
    reviewCount: 56,
    description: "Personal shopping service for groceries and essentials.",
    includes: ["Shopping list review", "Store visits", "Delivery to home"],
    image: "https://picsum.photos/400/200?random=3",
    status: "active"
  },
  {
    id: "svc-004",
    name: "Clinic Escort",
    category: "healthcare",
    price: 100,
    duration: "3-4 hours",
    rating: 4.9,
    reviewCount: 42,
    description: "Accompanied transport to medical appointments.",
    includes: ["Home pickup", "Clinic accompaniment", "Medication collection", "Return transport"],
    image: "https://picsum.photos/400/200?random=4",
    status: "active"
  }
];

export const WORKERS: Worker[] = [
  {
    id: "wrk-001",
    name: "Mak Cik Ani",
    avatar: "https://picsum.photos/100/100?random=10",
    rating: 4.9,
    reviewCount: 127,
    services: ["svc-001", "svc-002"],
    phone: "+60123456789",
    verified: true
  },
  {
    id: "wrk-002",
    name: "Pak Cik Ahmad",
    avatar: "https://picsum.photos/100/100?random=11",
    rating: 4.8,
    reviewCount: 98,
    services: ["svc-003", "svc-004"],
    phone: "+60129876543",
    verified: true
  }
];

export const CATEGORIES: { label: string; value: string; icon: string }[] = [
  { label: 'All', value: 'All', icon: '🏠' },
  { label: 'Cleaning', value: 'cleaning', icon: '🧹' },
  { label: 'Food', value: 'food', icon: '🍽️' },
  { label: 'Shop', value: 'shopping', icon: '🛒' },
  { label: 'Health', value: 'healthcare', icon: '🏥' },
];
