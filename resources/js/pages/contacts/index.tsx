
  import { Inertia } from '@inertiajs/inertia';
  import { Link } from '@inertiajs/react';
  import Header from '../../components/header/header'; // adapte le chemin si nécessaire

  interface Contact {
    id: number;
    name: string;
    email: string;
    mobile: string;
    address?: string;
  }

  interface PaginatedContacts {
    data: Contact[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  }

  interface Props {
    contacts: PaginatedContacts;
  }

  export default function ContactIndex({ contacts }: Props) {
    const handleDelete = (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
        Inertia.delete(`/contacts/${id}`);
      }
    };

    return (
      <>
        <Header />

        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Contacts</h1>

          <Link
            href="/contacts/create"
            className="inline-block mb-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Ajouter un contact
          </Link>

          <table className="w-full border-t">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Nom</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Téléphone</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {contacts.data.length > 0 ? (
  contacts.data.map((contact) => (
    <tr key={contact.id} className="border-b hover:bg-gray-50">
      <td className="p-2">{contact.name}</td>
      <td className="p-2">{contact.email}</td>
      <td className="p-2">{contact.mobile}</td>
      <td className="p-2 space-x-2">
        <Link
          href={`/contacts/${contact.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Modifier
        </Link>
        <button
          onClick={() => handleDelete(contact.id)}
          className="text-red-600 hover:underline"
        >
          Supprimer
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={4} className="text-center p-4 text-gray-500">
      Aucun contact trouvé.
    </td>
  </tr>
)}

            </tbody>
          </table>
        </div>
      </>
    );
  }
