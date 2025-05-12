import { useForm } from '@inertiajs/react';

interface Props {
  contact: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    address: string;
  };
}

export default function ContactEdit({ contact }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: contact.name,
    email: contact.email,
    mobile: contact.mobile,
    address: contact.address,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/contacts/${contact.id}`); // ✅ utiliser `put` directement
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Edit Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
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
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            value={data.mobile}
            onChange={(e) => setData('mobile', e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
