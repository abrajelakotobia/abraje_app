import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PostFormData } from '@/types/post';
import { CITY_SECTORS } from '@/types/cities';
import { CityName } from '@/types/city';
import Header from '../../components/header/header';

export default function EditPost({ post: initialPost }: { post: PostFormData & { id: number } }) {
    const { data, setData, put, processing, errors } = useForm<PostFormData>({
      city: initialPost.city,
      sector: initialPost.sector,
      price: initialPost.price,
      product: initialPost.product,
      type: initialPost.type,
      bedrooms: initialPost.bedrooms,
      bathrooms: initialPost.bathrooms,
      area: initialPost.area,
      address: initialPost.address,
      address_maps: initialPost.address_maps,
      title: initialPost.title,
      description: initialPost.description,
      image: null,
      images: [],
    });

    const [availableSectors, setAvailableSectors] = useState<string[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      initialPost.image ? URL.createObjectURL(initialPost.image) : null
    );
    const [previewImages, setPreviewImages] = useState<string[]>(
      initialPost.images ? initialPost.images.map(img => URL.createObjectURL(img)) : []
    );

    // N'oubliez pas de libérer les URLs créées quand le composant est démonté
    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewImages.forEach(url => URL.revokeObjectURL(url));
      };
    }, [previewUrl, previewImages]);

  

  useEffect(() => {
    if (data.city && CITY_SECTORS[data.city as CityName]) {
      setAvailableSectors(CITY_SECTORS[data.city as CityName]);
    } else {
      setAvailableSectors([]);
    }
  }, [data.city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/posts/${initialPost.id}`);
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
      setData('images', [...data.images as File[], ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...data.images as File[]];
    newImages.splice(index, 1);
    setData('images', newImages);

    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier l'annonce</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              placeholder="Titre de l'annonce"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Description détaillée"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <select
                value={data.city}
                onChange={(e) => setData('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez une ville</option>
                {Object.keys(CITY_SECTORS).map((city) => (
                  <option key={city} value={city} className="py-1">{city}</option>
                ))}
              </select>
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
              <select
                value={data.sector}
                onChange={(e) => setData('sector', e.target.value)}
                disabled={!data.city}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">-- Secteur --</option>
                {availableSectors.map((sector) => (
                  <option key={sector} value={sector} className="py-1">{sector}</option>
                ))}
              </select>
              {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DH)</label>
              <input
                type="number"
                placeholder="Prix"
                value={data.price || ''}
                onChange={(e) => setData('price', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de bien</label>
              <select
                value={data.product}
                onChange={(e) => setData('product', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Produit --</option>
                <option value="appartement">Appartement</option>
                <option value="Maison">Maison</option>
                <option value="terrains">Terrains</option>
                <option value="villas">Villas</option>
                <option value="magasins">Magasins</option>
                <option value="bureaux">Bureaux</option>
                <option value="immeubles">Immeubles</option>
                <option value="hotels">Hôtels</option>
                <option value="restaurants">Restaurants</option>
                <option value="cafes">Cafés</option>
                <option value="autres">Autres</option>
              </select>
              {errors.product && <p className="mt-1 text-sm text-red-600">{errors.product}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'annonce</label>
              <select
                value={data.type}
                onChange={(e) => setData('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Type --</option>
                <option value="vente">Vente</option>
                <option value="location">Location</option>
                <option value="location vacances">Location vacances</option>
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
              <input
                type="number"
                placeholder="Nombre"
                value={data.bedrooms || ''}
                onChange={(e) => setData('bedrooms', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
              <input
                type="number"
                placeholder="Nombre"
                value={data.bathrooms || ''}
                onChange={(e) => setData('bathrooms', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Superficie (m²)</label>
              <input
                type="number"
                placeholder="Superficie"
                value={data.area || ''}
                onChange={(e) => setData('area', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              type="text"
              placeholder="Adresse complète"
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien Google Maps</label>
            <input
              type="text"
              placeholder="https://maps.google.com/..."
              value={data.address_maps}
              onChange={(e) => setData('address_maps', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.address_maps && <p className="mt-1 text-sm text-red-600">{errors.address_maps}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image principale</label>
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
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={handleCoverImageChange}
                    accept="image/*"
                  />
                </label>
                {previewUrl && (
                  <div className="flex-shrink-0 relative">
                    <img src={previewUrl} alt="Prévisualisation" className="h-24 w-24 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => {
                        setData('image', null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images supplémentaires (max 10)</label>
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
                    id="images"
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
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Mise à jour en cours...' : 'Mettre à jour l\'annonce'}
          </button>
        </div>
      </form>
    </>
  );
}
