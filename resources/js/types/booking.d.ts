// resources/js/types/booking.ts
import type { User } from './index';

export interface Post {
  id: number;
  title: string;
  image?: string;
}

export interface Booking {
  id: number;
  post_id: number;
  user_id: number;
  date: string;
  entry_time: string;
  datetime?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  post?: Post;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface PageProps {
  auth: {
    user?: User;
  };
  flash?: {
    success?: string;
    error?: string;
  };
   [key: string]: unknown;
}

export interface Props {
  bookings: Booking[];
}
