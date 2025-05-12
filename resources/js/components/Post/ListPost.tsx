import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Edit, Eye, Heart, Search, Trash, User as UserIcon, ToggleLeft, ToggleRight } from "lucide-react";

// Types
type UserRole = 'user' | 'admin' | 'superadmin';

interface User {
  id: number;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  city: string;
  sector: string;
  type: string;
  price: number;
  image?: string;
  is_active: boolean;
  is_liked: boolean;
  likes_count: number;
  created_at: string;
  user_id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
    phone?: string;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PostsResponse {
  data: Post[];
  links: PaginationLink[];
}

export default function ListPosts({ posts, showAuthor = true }: { posts: PostsResponse; showAuthor?: boolean }) {
  const { auth } = usePage<{ auth: { user?: User } }>().props;
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  const isSuperAdmin = auth.user?.role === "superadmin";
  const canEditPost = (post: Post) => auth.user?.id === post.user_id || isSuperAdmin;

  const handleToggleActive = async (postId: number, currentStatus: boolean) => {
    try {
      await axios.patch(route("posts.toggle-active", postId), { is_active: !currentStatus });
      router.reload({ only: ["posts"] });
    } catch {
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleLike = (postId: number) => {
    if (!auth.user) {
      window.location.href = route("login");
      return;
    }

    router.post(route("posts.like", postId), {}, {
      preserveScroll: true,
      preserveState: true
    });
  };

  const handleDelete = (postId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      setDeletingId(postId);
      router.delete(route("posts.destroy", postId), {
        onSuccess: () => setDeletingId(null),
        onError: () => {
          setDeletingId(null);
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  };

  const handleDateChange = (date: Date) => {
    const dateString = date.toDateString();
    setSelectedDates((prev) =>
      prev.some((d) => d.toDateString() === dateString)
        ? prev.filter((d) => d.toDateString() !== dateString)
        : [...prev, date]
    );
  };

  const handleConfirmBooking = async () => {
    if (!auth.user) {
      window.location.href = route("login");
      return;
    }

    if (!activePostId || selectedDates.length === 0) {
      setError("Veuillez sélectionner au moins une date.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formattedDates = selectedDates.map((d) => d.toISOString().split("T")[0]).sort();

      await axios.post(route("booking.reserve", activePostId), {
        post_id: activePostId,
        dates: formattedDates,
      });

      setLoading(false);
      setShowPopup(false);
      setSelectedDates([]);
      router.visit(route("user.bookings"));
    } catch (err: unknown) {
      setLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la réservation."
      );
    }
  };

  const filteredPosts = posts.data.filter((post) => {
    if (isSuperAdmin && !showInactive && !post.is_active) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(term) ||
        post.description.toLowerCase().includes(term) ||
        post.author.name.toLowerCase().includes(term)
      );
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Barre de recherche et filtre superadmin */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-auto md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="h-5 w-5"/>
          </div>
          <input
            type="text"
            placeholder="Rechercher par titre, description ou auteur..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isSuperAdmin && (
          <Button
            variant="outline"
            onClick={() => setShowInactive(!showInactive)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {showInactive ? (
              <>
                <ToggleRight className="h-5 w-5 text-green-600" />
                <span>Masquer inactifs</span>
              </>
            ) : (
              <>
                <ToggleLeft className="h-5 w-5 text-gray-500" />
                <span>Afficher inactifs</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Grid des posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">Aucun post trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className={`overflow-hidden hover:shadow-md transition-shadow duration-300 border ${
                !post.is_active ? 'border-red-200 bg-red-50' : 'border-gray-100'
              }`}
            >
              {isSuperAdmin && (
                <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                  post.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {post.is_active ? 'Actif' : 'Inactif'}
                </div>
              )}

              {showAuthor && (
                <CardHeader className="border-b p-4">
                  <div className="flex items-center gap-3">
                    {post.author.avatar ? (
                      <img
                        src={`/storage/${post.author.avatar}`}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full border border-gray-200">
                        <UserIcon className="w-5 h-5 text-gray-400"/>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{post.author.name}</h3>
                      {post.author.phone && (
                        <p className="text-sm text-blue-600">{post.author.phone}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
              )}

              {post.image && (
                <Link href={route('posts.show', post.id)} className="block">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={`/storage/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {post.type}
                    </span>
                  </div>
                </Link>
              )}

              <CardContent className="p-4">
                <Link href={route('posts.show', post.id)}>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.description}</p>

                <div className="flex justify-between items-center mb-2">
                  {post.city && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.city}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {post.price.toLocaleString('fr-FR')} Dh
                  </h3>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(post.id)}
                    className={`rounded-full h-9 w-9 ${
                      post.is_liked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-red-500'
                    }`}
                    disabled={deletingId === post.id}
                  >
                    <Heart className="h-5 w-5" fill={post.is_liked ? "currentColor" : "none"}/>
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[20px] text-center">
                    {post.likes_count}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                    <Link href={route('posts.show', post.id)}>
                      <Eye className="h-5 w-5"/>
                    </Link>
                  </Button>

                  {canEditPost(post) && (
                    <>
                      <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                        <Link href={route('posts.edit', post.id)}>
                          <Edit className="h-5 w-5"/>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                      >
                        <Trash className="h-5 w-5"/>
                      </Button>
                    </>
                  )}

                  {isSuperAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleToggleActive(post.id, post.is_active)}
                      title={post.is_active ? 'Désactiver' : 'Activer'}
                    >
                      {post.is_active ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      setActivePostId(post.id);
                      setShowPopup(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 text-sm"
                    disabled={deletingId === post.id || !post.is_active}
                  >
                    Réserver
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.links.length > 3 && (
        <div className="flex justify-center mt-8 flex-wrap gap-2">
          {posts.links.map((link, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded ${
                link.active
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={!link.url}
              onClick={() => link.url && router.visit(link.url)}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}

      {/* Modal de réservation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Réserver ce logement</h2>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedDates([]);
                  setError(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <Calendar
                minDate={new Date()}
                onClickDay={handleDateChange}
                tileClassName={({ date }) =>
                  selectedDates.some(d => d.toDateString() === date.toDateString())
                    ? "bg-blue-200 rounded-md"
                    : undefined
                }
              />
            </div>

            {selectedDates.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Dates sélectionnées :</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedDates
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((date, index) => (
                      <li key={index}>{date.toLocaleDateString("fr-FR")}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPopup(false);
                  setSelectedDates([]);
                  setError(null);
                }}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
