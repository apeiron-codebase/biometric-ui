'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar, 
} from '@/components/ui/sidebar';

import Image from 'next/image';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const { open } = useSidebar(); // get collapse state

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-background">
        {/* header */}
      <SidebarHeader className="py-4">
        <div
          className={cn(
            "flex items-center gap-3 transition-all",
            open ? "px-1 justify-start" : "px-2 justify-center"
          )}
        >

          <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden">
            <Image
              src="/apeiron-logo.png"
              alt="Apeiron"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          {open && (
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">Apeiron</span>
              <span className="text-xs text-muted-foreground"> Workforce Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-1 pb-4">
        <NavMain />
      </SidebarContent>

      <NavUser />

      <SidebarRail />
    </Sidebar>
  );
}