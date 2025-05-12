// @/types/index.ts ou @/types/page.ts
import { AppUser } from './user';

interface PageProps {
  auth: {
    user: AppUser;
  };
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    // Ajouter d'autres champs qui pourraient être présents dans l'utilisateur
  }

  export interface PageProps {
    auth: {
      user: AuthUser | null;
      // Ajouter d'autres informations liées à l'authentification si nécessaire
    };
    // Remplacer "any" par un type spécifique pour les autres propriétés
    [key: string]: string | number | boolean | null | AuthUser | undefined; // spécifier le type des autres propriétés
  }
