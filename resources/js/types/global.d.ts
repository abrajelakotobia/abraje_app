import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}
// types/page.d.ts ou types/global.d.ts

import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar?: string; // 👈 autorise avatar
  is_admin?: boolean;
  // ajoute d'autres champs si nécessaires
}

export interface PageProps extends InertiaPageProps {
  auth: {
    user: AuthUser | null;
  };
}
