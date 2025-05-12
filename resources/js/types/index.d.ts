// types/auth.d.ts
export type UserRole = 'user' | 'admin' | 'superadmin'; // Ajout d'un rôle super admin

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: UserRole; // Changement de 'utype' à 'role' pour plus de clarté
    email_verified_at?: string | null;
    avatar?: string | null;
    created_at?: string;
    updated_at?: string;

    // Méthodes pratiques (optionnel)
    canEdit?: boolean;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
}

export interface Admin {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    created_at: string;
}

// types/inertia.d.ts
import { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
    export interface PageProps {
        auth: {
            user?: User;
        };
        flash?: {
            success?: string;
            error?: string;
            warning?: string;
            info?: string;
        };
        // Autres propriétés globales communes
    }
}

// Utilitaires pour les composants
export type PageProps<T extends Record<string, unknown> = {''}> = InertiaPageProps & {
    auth: {
        user?: User;
    };
} & T; // Permet d'étendre avec des props spécifiques

// Type pour les breadcrumbs amélioré
export interface BreadcrumbItem {
    title: string;
    href?: string; // Rend href optionnel pour le dernier élément
    icon?: React.ReactNode;
    current?: boolean;
}
