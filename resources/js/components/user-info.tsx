import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {


    return (
        <>
           <Avatar>
        <AvatarImage
          src={user?.avatar ? `/storage/${user.avatar}` : '/images/default-avatar.png'}
          alt={user?.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
        />
        <AvatarFallback>
          {user?.name?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
