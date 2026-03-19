'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function NavUser() {
  const router = useRouter();
  const { open } = useSidebar();

  const user = {
    name: 'Admin',
    email: 'admin@apeiron.com',
    initials: 'AU',
    avatar: null,
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  return (
    <div className={cn("border-t mt-auto", open ? "px-3 py-4" : "px-2 py-4")}>
      {open ? (
        //  EXPANDED: avatar + name/email + logout in a row 
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar className="h-8 w-8 shrink-0 border">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {user.initials}
              </AvatarFallback>
            )}
          </Avatar>

          {/* Name + email */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold truncate">{user.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>

          {/* Logout icon button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Logout</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        // COLLAPSED: avatar + logout stacked and centered 
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-8 w-8 border">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {user.initials}
              </AvatarFallback>
            )}
          </Avatar>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}