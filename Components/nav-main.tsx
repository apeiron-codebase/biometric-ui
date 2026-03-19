// nav body 
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Clock,
  CalendarCheck,
  UserPlus,
  MapPin,
} from 'lucide-react';
import { Separator } from 'radix-ui';

const navItems = [
  { title: 'Check-in / Check-out', url: '/dashboard/checkin-checkout', icon: Clock },
  { title: 'Attendance', url: '/dashboard/attendance', icon: CalendarCheck },
  { title: 'Employee Registration', url: '/dashboard/employees', icon: UserPlus },
  { title: 'Live Location Monitoring', url: '/dashboard/location', icon: MapPin },
];

export function NavMain() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="gap-1.5 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title} data-active={true}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={cn(
                "group relative h-10 w-full justify-start gap-3 rounded-lg px-3 text-sm font-medium",
                // Default state
                "bg-transparent! text-muted-foreground! transition-all! duration-150!",
                // Hover state
                "hover:bg-accent/50! hover:text-foreground!",
                // Active state (selected menu)
                "data-[active=true]:bg-accent! data-[active=true]:text-foreground!",
                // Optional: subtle left indicator (clean modern style)
                "data-[active=true]:before:absolute! data-[active=true]:before:left-0! data-[active=true]:before:h-6 data-[active=true]:before:w-1! data-[active=true]:before:bg-green-500 data-[active=true]:before:rounded-r!",
                // Collapsed behavior
                "data-[collapsible=icon]:justify-center! data-[collapsible=icon]:px-0!",
                "data-[collapsible=icon]:[&>svg]:mx-auto!",

                // Active: colored left border + slight background + text/icon emphasis
                isActive && [
                  "bg-primary/5 text-primary font-medium",
                  "before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:rounded-r before:bg-primary",
                ]
              )}
            >
              <Link href={item.url}>
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}