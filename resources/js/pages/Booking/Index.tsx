import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import Header from '../../components/header/header';
import type { PageProps, Booking, Props } from '@/types/booking';
import type { User } from '@/types/index';

export default function BookingIndex({ bookings }: Props) {
  const { props } = usePage<PageProps>();
  const currentUser: User | undefined = props.auth?.user;

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      Inertia.delete(`/bookings/${id}`);
    }
  };

  const formatStatus = (status: Booking['status']) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Mes Réservations</h1>

        <Link
          href="/bookings/create"
          className="inline-block mb-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Créer une réservation
        </Link>

        <table className="w-full border-t text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Date</th>
              <th className="p-2">Heure</th>
              <th className="p-2">Annonce</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    {new Date(booking.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-2">{booking.entry_time}</td>
                  <td className="p-2">
                    {booking.post?.title || 'Annonce supprimée'}
                    {booking.post?.image && (
                      <img
                        src={`/storage/${booking.post.image}`}
                        alt={booking.post.title}
                        className="w-10 h-10 object-cover mt-1"
                      />
                    )}
                  </td>
                  <td className="p-2">{formatStatus(booking.status)}</td>
                  <td className="p-2 space-x-2 whitespace-nowrap">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Voir
                    </Link>
                    <Link
                      href={`/bookings/${booking.id}/edit`}
                      className="text-yellow-600 hover:underline mr-2"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Aucune réservation trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
