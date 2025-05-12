import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import Header from '../../components/header/header';

interface Post {
  id: number;
  city: string;
  sector: string;
  type: string;
  address?: string;
  title: string;
  price?: number;
  image?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PostsResponse {
  data: Post[];
  links: PaginationLink[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  posts: PostsResponse;
  auth: {
    user: {
      id: number;
      role: 'user' | 'admin' | 'superadmin';
    };
  };
}

export default function PostIndex({ posts, auth }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      Inertia.delete(`/posts/${id}`);
    }
  };

  const toggleActive = (id: number) => {
    Inertia.patch(`/posts/${id}/toggle-active`);
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes Annonces</h1>
          <Link
            href="/posts/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
          >
            Créer une nouvelle annonce
          </Link>
        </div>

        {posts.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.data.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    {post.image ? (
                      <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Aucune image
                      </div>
                    )}
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {post.type}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
                      <span className="text-lg font-bold text-blue-600">
                        {post.price ? `${post.price} €` : '—'}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      <span className="block">{post.city} - {post.sector}</span>
                      {post.address && <span className="block truncate">{post.address}</span>}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('fr-FR')}
                      </span>
                      <div className="space-x-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Supprimer
                        </button>
                        {auth.user.role === 'superadmin' && (
                          <button
                            onClick={() => toggleActive(post.id)}
                            className={`text-sm font-medium ${
                              post.is_active ? 'text-green-600 hover:text-green-800' : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            {post.is_active ? 'Désactiver' : 'Activer'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                {posts.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      link.active
                        ? 'bg-blue-50 border-blue-500 text-blue-600'
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    preserveScroll
                  >
                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                  </Link>
                ))}
              </nav>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">Vous n'avez aucune annonce pour le moment.</p>
            <Link
              href="/posts/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
            >
              Créer votre première annonce
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
