import { usePage } from '@inertiajs/react';
import { PagePropsWithContacts, Contact } from '@/types';

export default function Contacts() {
  const { contacts } = usePage<PagePropsWithContacts>().props;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages reçus</h1>
      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Téléphone</th>
            <th className="px-4 py-2 text-left">Message</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.data.map((contact: Contact) => (
            <tr key={contact.id} className="border-t">
              <td className="px-4 py-2">{contact.name}</td>
              <td className="px-4 py-2">{contact.email}</td>
              <td className="px-4 py-2">{contact.mobile}</td>
              <td className="px-4 py-2">{contact.message}</td>
              <td className="px-4 py-2">{new Date(contact.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
