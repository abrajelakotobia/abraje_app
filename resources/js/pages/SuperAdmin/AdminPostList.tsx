import { usePage, router } from '@inertiajs/react';
import { Switch } from '@headlessui/react';
import type { PageProps } from '@/types';
import type { Post } from '@/types/post';

interface AdminPostListProps {
    posts: Post[];
}

export default function AdminPostList({ posts }: AdminPostListProps) {
    const { auth } = usePage<PageProps>().props;

    if (auth.user?.role !== 'superadmin') {
        return <p>Accès refusé.</p>;
    }

    const toggleStatus = (postId: number, current: boolean) => {
        router.put(`/admin/posts/${postId}/toggle`, {
            is_active: !current
        }, { preserveScroll: true });
    };

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.description}</p>
                    </div>

                    <Switch
                        checked={post.is_active}
                        onChange={() => toggleStatus(post.id, post.is_active)}
                        className={`${post.is_active ? 'bg-green-500' : 'bg-gray-300'}
                            relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                        <span className="sr-only">Activer/Désactiver</span>
                        <span
                            className={`${
                                post.is_active ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>
            ))}
        </div>
    );
}
