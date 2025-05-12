import { usePage } from "@inertiajs/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar() {
  const { auth } = usePage().props;

  const user = auth.user;

  return (
    <div className="flex items-center space-x-2">
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
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {user?.name}
      </span>
    </div>
  );
}
