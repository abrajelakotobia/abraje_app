import { Link } from '@inertiajs/react';
import { MessageSquare, Mail } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrateur</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/chat"
          className="flex items-center p-6 bg-white shadow rounded hover:bg-indigo-50 transition"
        >
          <MessageSquare className="text-indigo-600 mr-4" size={32} />
          <div>
            <h2 className="text-xl font-semibold">Chat Utilisateurs</h2>
            <p className="text-sm text-gray-600">Voir et répondre aux messages en temps réel</p>
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          className="flex items-center p-6 bg-white shadow rounded hover:bg-indigo-50 transition"
        >
          <Mail className="text-green-600 mr-4" size={32} />
          <div>
            <h2 className="text-xl font-semibold">Contacts</h2>
            <p className="text-sm text-gray-600">Messages envoyés depuis la page contact</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
