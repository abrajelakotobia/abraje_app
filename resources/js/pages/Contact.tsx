import { useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/messanger');
    };

    return (
        <div className="max-w-xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Contactez-nous</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nom</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                    <label className="block font-medium">Message</label>
                    <textarea
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.message && <p className="text-red-500">{errors.message}</p>}
                </div>
                <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Envoyer
                </button>
            </form>
        </div>
    );
}
