import { useForm } from '@inertiajs/react';
import Header from '../../components/header/header';

export default function Contact() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contacts', {
      onSuccess: () => reset(),
    });
  };

  return (

      <>
            <Header />
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Contactez-nous</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Téléphone</label>
          <input
            type="text"
            value={data.mobile}
            onChange={(e) => setData('mobile', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Adresse</label>
          <textarea
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            rows={3}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
    </>
  );
}
