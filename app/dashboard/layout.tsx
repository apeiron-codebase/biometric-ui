import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        {/* Fixed header – offset by sidebar width */}
        <header
          className="
            fixed top-0 z-50 h-14 lg:h-16 border-b
            bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
          "
          style={{
            left: "var(--sidebar-width)",
            right: 0,
          }}
        >
          <div className="flex h-full items-center justify-between px-5 sm:px-6 lg:px-8">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="relative h-5 w-9 overflow-hidden rounded">
                <Image
                  src="/apeiron-logo.png"
                  alt="Apeiron Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">Apeiron</span>
            </div>

            {/* Logout */}
            <Link
              href="/logout"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Logout
            </Link>
          </div>
        </header>

        {/* Main content – NO extra left margin */}
        <SidebarInset
          className="
            flex flex-1 flex-col bg-background
            pt-14 lg:pt-16
            overflow-x-hidden
            w-full
            min-w-0
          "
        >
          {/* Centers content and limits max width */}
          <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}