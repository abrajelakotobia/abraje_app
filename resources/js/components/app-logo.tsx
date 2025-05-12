import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <div className="flex items-center space-x-2">

            <div className="text-left text-sm">
            <Link
                            href="/"
                            className="flex items-center space-x-2 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        >
                            <img
                                src="/images/logo.png"
                                alt="Logo AbrajeImmo"
                                className="h-8 w-8 object-contain"
                            />
                            <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-200">
                                AbrajeImmo
                            </span>
            </Link>
            </div>
        </div>
    );
}
