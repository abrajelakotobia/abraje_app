import { PageProps  } from '@inertiajs/core';

declare module '@inertiajs/core' {
  export interface PageProps {
    auth: {
      user?: {
        id: number;
        name: string;
        email: string;
        role: string;
        // ... autres champs utilisateur
      };
    };
    // ... autres props globales
  }
}
