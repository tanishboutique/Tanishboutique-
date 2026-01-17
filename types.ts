
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface LaceOption {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // App Price
  originalPrice: number; // Real Price
  category: 'Suits' | 'Bridal' | 'Anarkali' | 'Blouse & Saree' | 'Accessories';
  description: string;
  images: string[]; // Updated to support multiple high-quality images
  reviews: Review[];
  allowsLaces?: boolean;
  laceOptions?: LaceOption[];
}

export interface CartItem extends Product {
  quantity: number;
  requestedDate?: string;
  laceMeters?: number;
  selectedLace?: LaceOption;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  amountPaid: number;
  paymentType: 'Full' | '50% Advance';
  status: 'Processing' | 'In Stitching' | 'Shipped' | 'Delivered';
  items: { 
    name: string; 
    quantity: number; 
    price: number; 
    requestedDate?: string;
    laceMeters?: number;
    selectedLace?: LaceOption;
  }[];
}

export interface Measurements {
  bust: string;
  waist: string;
  hips: string;
  suitLength: string;
  sleeveLength: string;
  neckFront: string;
  neckBack: string;
}

export interface BookingService {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

export enum View {
  Home = 'home',
  Shop = 'shop',
  Booking = 'booking',
  Stylist = 'stylist',
  Measurements = 'measurements',
  Account = 'account'
}
