import { Head, useForm } from '@inertiajs/react';

interface OtpVerifyProps {
  email: string;
  message?: string;
}

export default function OtpVerify({ email, message }: OtpVerifyProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: email || '',
    otp: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('otp.verify'));
  };

  return (
    <>
      <Head title="Vérifier OTP" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Vérifier le code OTP
            </h2>
            {email && (
              <p className="mt-2 text-center text-sm text-gray-600">
                Un code a été envoyé à <span className="font-medium">{email}</span>
              </p>
            )}
            {message && (
              <p className="mt-2 text-center text-sm text-green-600">{message}</p>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <input type="hidden" name="email" value={data.email} />

            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Code OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={data.otp}
                  onChange={(e) => setData('otp', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">{errors.otp}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {processing ? 'Vérification...' : 'Vérifier'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
