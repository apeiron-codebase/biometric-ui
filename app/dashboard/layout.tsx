'use client';

import AppSidebar from '@/components/app-sidebar';
import { SidebarInset, SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            {/* Top bar with collapse button */}
            <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
            </header>

            {/* Main content*/}
            <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}