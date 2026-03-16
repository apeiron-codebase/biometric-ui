"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Clock,
  CalendarCheck,
  Users,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Check-in/out Monitor",
      url: "/dashboard/checkin",
      icon: Clock,
    },
    {
      title: "Attendance/Leave",
      url: "/dashboard/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Employee Registration",
      url: "/dashboard/employees",
      icon: Users,
    },
  ];

  return (
    <Sidebar> {/* fixed, no collapse */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-sm">AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold">Admin</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="py-4 px-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-3.5"> {/* better spacing between items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="className = h-11 px-4 text-base font-medium
              transition-colors duration-150 ease-in-out
              hover:bg-[hsl(var(--sidebar-accent))]
              data-[active=true]:bg-[hsl(var(--sidebar-primary))]
              data-[active=true]:text-[hsl(var(--sidebar-primary-foreground))]
              rounded-lg"
                  >
                    <Link href={item.url}>
                      <Icon className="className=h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <div></div>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}