import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Admin {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    created_at: string;
}

interface Props extends PageProps {
    admins: Admin[];
}

export default function AdminList({ admins }: Props) {
    return (
        <>
            <Head title="Liste des administrateurs" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6">Liste des administrateurs</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {admins.map((admin) => (
                        <Card key={admin.id} className="p-4 flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={admin.avatar ? `/storage/${admin.avatar}` : undefined} />
                                <AvatarFallback>{admin.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{admin.name}</p>
                                <p className="text-sm text-muted-foreground">{admin.email}</p>
                                <p className="text-sm text-muted-foreground">{admin.phone}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
