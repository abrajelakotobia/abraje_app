import { usePage, Head, Link } from '@inertiajs/react';
import Nav from '@/components/header/header';
import ListPost from '@/components/Post/ListPost';
import type { PageProps} from '@/types/home';

export default function Welcome() {
    const { posts, latestPosts } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Abrajeimmo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <Nav />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
                    <ListPost posts={posts} />

                    {latestPosts?.links?.length > 3 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex items-center space-x-1">
                                {latestPosts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                            link.active
                                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        preserveScroll
                                    >
                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
