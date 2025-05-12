import { Link } from '@inertiajs/react';
import { Admin } from '@/types';

interface AdminListProps {
    admins: Admin[];
    handleDelete: (id: number) => void;
}

export default function AdminList({ admins, handleDelete }: AdminListProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Liste des administrateurs</h2>
                <Link
                    href="/admin/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring ring-blue-300 transition ease-in-out duration-150"
                >
                    Ajouter un administrateur
                </Link>
            </div>

            {admins.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Téléphone</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                                        {admin.avatar && (
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={`/storage/${admin.avatar}`}
                                                alt={admin.name}
                                            />
                                        )}
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{admin.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{admin.phone}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                        <Link
                                            href={`/admin/${admin.id}`}
                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            Voir
                                        </Link>
                                        <Link
                                            href={`/admin/${admin.id}/edit`}
                                            className="text-yellow-600 hover:underline dark:text-yellow-400"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(admin.id)}
                                            className="text-red-600 hover:underline dark:text-red-400"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="px-6 py-12 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun administrateur</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Commencez par ajouter un administrateur.</p>
                    <div className="mt-6">
                        <Link
                            href="/admin/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                        >
                            Ajouter un administrateur
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
