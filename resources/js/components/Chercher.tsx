import { Search, MapPin, ChevronRight, Grid3x3 } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm w-full max-w-5xl mx-auto mt-6">

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Que recherchez-vous ?"
        className="flex-1 bg-gray-50 text-gray-500 placeholder:text-gray-400 rounded-full px-4 py-3 text-sm focus:outline-none"
      />

      {/* Catégories */}
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-md cursor-pointer">
        <Grid3x3 className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-800">Toutes les catégories</span>
      </div>

      {/* Chevron */}
      <ChevronRight className="text-gray-500" />

      {/* Localisation */}
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-md cursor-pointer">
        <MapPin className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-400">Choisir ville - secteur</span>
      </div>

      {/* Bouton Rechercher */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium rounded-full flex items-center gap-2 transition">
        <Search className="w-4 h-4" />
        Rechercher
      </button>
    </div>
  );
}
