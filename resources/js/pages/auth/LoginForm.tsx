import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginFormProps {
  onSuccess: () => void;
  onRegisterClick: () => void;
  canResetPassword: boolean;
}

export default function LoginForm({
  onSuccess,
  onRegisterClick,
  canResetPassword,
}: LoginFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onSuccess: () => onSuccess(),
      onFinish: () => reset('password'),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="email@example.com"
        />
        <InputError message={errors.email} className="mt-1" />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          {canResetPassword && (
            <a
              href={route('password.request')}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Forgot password?
            </a>
          )}
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Password"
        />
        <InputError message={errors.password} className="mt-1" />
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={data.remember}
          onChange={(e) => setData('remember', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
          Remember me
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={processing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          Log in
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onRegisterClick}
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
