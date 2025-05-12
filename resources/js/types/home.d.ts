import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  city: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  created_at: string;
  user_id: number;
  is_liked: boolean;
  likes_count: number;
  is_featured: boolean;
  author: User;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PostsResponse {
  data: Post[];
  links: PaginationLink[];
}

// Étendez les propriétés de base d'Inertia
export interface PageProps extends InertiaPageProps {
  featuredPosts: Post[];
  latestPosts: PostsResponse;
  auth: {
    user: User | null;
  };
  canRegister: boolean;
   [key: string]: string | number | boolean | null | AuthUser | undefined; // Ajoutez cette ligne pour l'index signature
}
