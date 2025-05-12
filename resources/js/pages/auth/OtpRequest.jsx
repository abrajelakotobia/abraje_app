import { Head, useForm } from '@inertiajs/react';
export default function OtpRequest() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('otp.request'));
    };
    return (<>
            <Head title="Demander OTP"/>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Demander un code OTP
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse Email
                                </label>
                                <input id="email" type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={data.email} onChange={(e) => setData('email', e.target.value)}/>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={processing} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {processing ? 'Envoi en cours...' : 'Envoyer le code OTP'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>);
}
