import { Head, Link } from '@inertiajs/react';
import Header from '../components/header/header';
//import  Header from  '../layouts/app/app-header-layout'
import { UserIcon } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import Icon_Immo from  '../components/icon_immo';
import FooterWithUserChat from '../components/FooterWithUserChat';
import Cherche from '@/components/Chercher';
import SliderComponent from '../components/SliderComponent';



interface Author {
    id: number;
    name: string;
    avatar?: string;
    phone?: string;
  }

interface Post {
  id: number;
  city: string;
  sector: string;
  type: string;
  address?: string;
  title: string;
  price?: number;
  image?: string;
  created_at: string;
  updated_at: string;
  author: Author;
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
  filters?: {
    city?: string;
    sector?: string;
    type?: string;
    query?: string;
  };
}

export default function PostIndex({ posts, filters = {} }: Props) {
  const { setData, get } = useForm({
    query: filters?.query || '',
    city: filters?.city || '',
    sector: filters?.sector || '',
    type: filters?.type || ''
  });


  // Example usage of a form submission
  // <form onSubmit={(e) => {
  //   e.preventDefault();
  //   get(route('posts.index'));
  // }}>
  //   {/* Form content */}
  // </form>

  const resetFilters = () => {
    setData({
      query: '',
      city: '',
      sector: '',
      type: ''
    });
    get(route('posts.index'));
  };

  return (
    <>
      <Head title="AbrajeImmo" />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Cherche />
            </div>
{/* Slider en haut avec les 3 premiers posts */}
<SliderComponent posts={posts.data.filter((post): post is Post & { image: string } => post.image !== undefined).slice(0, 9)} />


        <div className="flex justify-between items-center mb-4">
        <Icon_Immo />
        </div>
        {/* Liste des annonces */}
        {posts.data.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.data.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
                  {/* En-tête avec auteur */}
                  <div className="p-4 border-b">
  <div className="flex items-center gap-3">
    {post.author.avatar ? (
      <img
        src={`/storage/${post.author.avatar}`}
        alt={post.author.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
      />
    ) : (
      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full border border-gray-200">
        <UserIcon className="w-5 h-5 text-gray-400" />
      </div>
    )}

    <div>
      <h3 className="text-lg font-semibold text-gray-800">{post.author.name}</h3>

      {post.author.phone && (
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-blue-600">{post.author.phone}</p>

          {/* WhatsApp Icon */}
          <a
            href={`https://wa.me/${post.author.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600"
            title="Contacter sur WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </a>

          {/* Facebook Icon */}
          <a
            href="https://facebook.com" // Remplace par un lien spécifique si tu as un profil
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
            title="Voir sur Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  </div>
</div>

                  {/* Image du post */}
                  {post.image && (
                    <div className="h-48 bg-gray-200 relative">
                        <Link href={`/posts/${post.id}`}>
                      <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      </Link>
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {post.type}
                      </span>
                    </div>
                  )}

                  {/* Contenu du post */}
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>

                    </div>

                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p className="flex items-center">
                        <span className="font-medium">Localisation:</span>
                        <span className="ml-2">{post.city} - {post.sector}</span>
                      </p>
                      {post.address && (
                        <p className="truncate">
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Publié le {new Date(post.created_at).toLocaleDateString('fr-FR')}
                        </span>
                        <div className="flex space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                        {post.price ? `${post.price.toLocaleString('fr-FR')} Dh` : 'Prix sur demande'}
                      </span>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <FooterWithUserChat />
            {/* Pagination */}
            {posts.links.length > 3 && (
              <div className="mt-8">
                <nav className="flex items-center justify-center space-x-1">
                  {posts.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url || '#'}
                      preserveScroll
                      className={`px-4 py-2 border rounded-md text-sm font-medium min-w-[40px] text-center ${
                        link.active
                          ? 'bg-blue-50 border-blue-500 text-blue-600'
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                      {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">Aucune annonce trouvée.</p>
            <div className="space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Réinitialiser
              </button>
              <Link
                href="/posts/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
                Créer une annonce
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
