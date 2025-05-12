import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PostFormData, CityName, CITY_SECTORS, ProductType, ListingType } from '@/types/post';
import Header from '../../components/header/header';

export default function CreatePost() {
  const { auth } = usePage().props;
  const isSuperAdmin = auth.user?.role === 'superadmin';

  const { data, setData, post, processing, errors } = useForm<PostFormData>({
    city: '',
    sector: '',
    price: '',
    product: '',
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    address: '',
    address_maps: '',
    title: '',
    description: '',
    image: null,
    images: [],
    is_active: true
  });

  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Mise à jour des secteurs disponibles quand la ville change
  useEffect(() => {
    if (data.city && CITY_SECTORS[data.city as CityName]) {
      setAvailableSectors(CITY_SECTORS[data.city as CityName]);
      setData('sector', '');
    } else {
      setAvailableSectors([]);
    }
  }, [data.city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'images' && Array.isArray(value)) {
          value.forEach(file => formData.append('images[]', file));
        } else {
          formData.append(key, value);
        }
      }
    });

    post('/posts', {
     data: formData,
      onSuccess: () => {
        setPreviewUrl(null);
        setPreviewImages([]);
      },
      preserveScroll: true,
    });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setData('images', files);
      setPreviewImages(files.map(file => URL.createObjectURL(file)));
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer une annonce</h2>

        {/* Champ Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre*</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Champ Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Ville et Secteur */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville*</label>
            <select
              value={data.city}
              onChange={(e) => setData('city', e.target.value as CityName)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez une ville</option>
              {Object.keys(CITY_SECTORS).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur*</label>
            <select
              value={data.sector}
              onChange={(e) => setData('sector', e.target.value)}
              disabled={!data.city}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              required
            >
              <option value="">Sélectionnez un secteur</option>
              {availableSectors.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
          </div>
        </div>

        {/* Prix, Type de bien et Type d'annonce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DH)*</label>
            <input
              type="number"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de bien*</label>
            <select
              value={data.product}
              onChange={(e) => setData('product', e.target.value as ProductType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="terrain">Terrain</option>
              <option value="villa">Villa</option>
              <option value="magasin">Magasin</option>
              <option value="bureau">Bureau</option>
              <option value="immeuble">Immeuble</option>
              <option value="hotel">Hôtel</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Café</option>
              <option value="autre">Autre</option>
            </select>
            {errors.product && <p className="mt-1 text-sm text-red-600">{errors.product}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type d'annonce*</label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value as ListingType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="vente">Vente</option>
              <option value="location">Location</option>
              <option value="location vacances">Location vacances</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>
        </div>

        {/* Chambres, Salles de bain et Superficie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
            <input
              type="number"
              value={data.bedrooms}
              onChange={(e) => setData('bedrooms', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
            <input
              type="number"
              value={data.bathrooms}
              onChange={(e) => setData('bathrooms', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Superficie (m²)</label>
            <input
              type="number"
              value={data.area}
              onChange={(e) => setData('area', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Adresse et Google Maps */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lien Google Maps</label>
          <input
            type="text"
            value={data.address_maps}
            onChange={(e) => setData('address_maps', e.target.value)}
            placeholder="https://goo.gl/maps/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Image principale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image principale*</label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleCoverImageChange}
                accept="image/*"
                required
              />
            </label>
            {previewUrl && (
              <div className="flex-shrink-0">
                <img src={previewUrl} alt="Prévisualisation" className="h-24 w-24 object-cover rounded-md" />
              </div>
            )}
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>

        {/* Images supplémentaires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images supplémentaires</label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB par image)</p>
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImagesChange}
                accept="image/*"
              />
            </label>
          </div>
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {previewImages.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Prévisualisation ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                </div>
              ))}
            </div>
          )}
          {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
        </div>

        {/* Activation pour superadmin */}
        {isSuperAdmin && (
          <div className="flex items-center">
            <input
              id="is_active"
              type="checkbox"
              checked={data.is_active ?? true}
              onChange={(e) => setData('is_active', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
              Annonce active
            </label>
          </div>
        )}

        {/* Bouton de soumission */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Publication en cours...' : 'Publier l\'annonce'}
          </button>
        </div>
      </form>
    </>
  );
}
