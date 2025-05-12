// Types pour les villes et secteurs
export type CityName = 'Casablanca' | 'Rabat' | 'Marrakech' | 'Fès' | 'Tanger' | 'Autre';

export const CITY_SECTORS: Record<CityName, string[]> = {
  'Casablanca': ['Centre ville', 'Anfa', 'Maârif', 'Ain Diab', 'Sidi Maarouf'],
  'Rabat': ['Agdal', 'Hassan', 'Souissi', 'Hay Riad', 'Yacoub El Mansour'],
  'Marrakech': ['Médina', 'Gueliz', 'Hivernage', 'Palmeraie', 'Sidi Youssef Ben Ali'],
  'Fès': ['Médina', 'Nouveau Fès', 'Saiss', 'Mechouar Fès Jdid'],
  'Tanger': ['Centre ville', 'Malabata', 'California', 'Rmilat'],
  'Autre': ['Centre ville', 'Quartier résidentiel', 'Zone industrielle']
};

// Types pour les produits immobiliers
export type ProductType =
  | 'appartement'
  | 'maison'
  | 'terrain'
  | 'villa'
  | 'magasin'
  | 'bureau'
  | 'immeuble'
  | 'hotel'
  | 'restaurant'
  | 'cafe'
  | 'autre';

// Types pour les annonces
export type ListingType = 'vente' | 'location' | 'location vacances';

// Interface principale pour les données du formulaire
export interface PostFormData {
  city: string;
  sector: string;
  price: number | string;
  product: string;
  type: string;
  bedrooms: number | string;
  bathrooms: number | string;
  area: number | string;
  address: string;
  address_maps: string;
  title: string;
  description: string;
  image: File | null;
  images: File[];
  // Add this index signature
}

// Define and export the Post type
export interface Post {
  id: number;
  title: string;
  city: string;
  sector: string;
  type: string;
  price: number | null;
  image?: string;
  created_at: string;
}
