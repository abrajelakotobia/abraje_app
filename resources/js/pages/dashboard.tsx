
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import type { User } from '@/types';
import type { Post } from '@/types/post';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  posts: {
    data: Post[];
    links: PaginationLink[];
  };
  auth: {
    user: User;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Mes Annonces',
    href: '#',
  },
];

export default function Dashboard({ posts }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      Inertia.delete(`/posts/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mes Annonces" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

        {/* Statistiques placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Statistique {i + 1}</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau des annonces */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Liste des annonces</h2>
            <Link
              href="/posts/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring ring-blue-300 transition ease-in-out duration-150"
            >
              Créer une annonce
            </Link>
          </div>

          {posts.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Localisation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.data.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        {post.image && (
                          <img className="h-10 w-10 rounded-full object-cover" src={`/storage/${post.image}`} alt={post.title} />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{post.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{post.sector}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {post.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {post.price ? `${post.price} €` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline dark:text-blue-400">Voir</Link>
                        <Link href={`/posts/${post.id}/edit`} className="text-yellow-600 hover:underline dark:text-yellow-400">Modifier</Link>
                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline dark:text-red-400">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Affichage de <span className="font-medium">1</span> à <span className="font-medium">{posts.data.length}</span> résultats
                  </p>
                </div>
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  {posts.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url || '#'}
                      className={`px-4 py-2 border text-sm font-medium ${
                        link.active
                          ? 'bg-blue-100 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                      } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                      preserveScroll
                    >
                      {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucune annonce</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Commencez par créer une nouvelle annonce.</p>
              <div className="mt-6">
                <Link href="/posts/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
                  Créer une annonce
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
