import { useState } from 'react';
import { router } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../../components/header/header';

interface Post {
  id: number;
  city: string;
  sector: string;
  type: string;
  address?: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
}

interface Props {
  post: Post;
}

export default function PostShow({ post }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date: Date) => {
    const exists = selectedDates.find(d => d.toDateString() === date.toDateString());
    if (exists) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates(prev => [...prev, date]);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedDates.length) return;
    setLoading(true);

    const formattedDates = selectedDates.map(d =>
      `${d.toISOString().slice(0, 10)} 12:00`
    );

    router.post('/bookings', {
      post_id: post.id,
      dates: formattedDates,
      entry_time: '12:00',
    }, {
      onSuccess: () => {
        setShowPopup(false);
        setSelectedDates([]);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {post.image && (
          <img
            src={`/storage/${post.image}`}
            alt={post.title}
            className="w-full max-h-96 object-cover rounded"
          />
        )}

        <div className="space-y-2">
          <p><strong>Ville :</strong> {post.city}</p>
          <p><strong>Secteur :</strong> {post.sector}</p>
          <p><strong>Type :</strong> {post.type}</p>
          <p><strong>Adresse :</strong> {post.address}</p>
          <p><strong>Prix :</strong> {post.price ? `${post.price} €` : 'Non précisé'}</p>
        </div>

        {post.description && (
          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Description</h2>
            <p>{post.description}</p>
          </div>
        )}

        {/* ✅ Bouton Réserver avec Popup */}
        <div className="mt-6">
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Réserver ce logement
          </button>
        </div>
      </div>

      {/* ✅ Popup Réservation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Réserver ce logement</h2>
              <button onClick={() => {
                setShowPopup(false);
                setSelectedDates([]);
              }} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            <div className="mb-6">
              <Calendar
                onClickDay={handleDateChange}
                tileClassName={({ date }) =>
                  selectedDates.some(d => d.toDateString() === date.toDateString())
                    ? 'bg-blue-200 rounded-md'
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
                      <li key={index}>{date.toLocaleDateString('fr-FR')}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? 'Chargement...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
