import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
// import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}
export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-purpleLight-100">
            <div className="flex items-center gap-2 px-4 ">
              <SidebarTrigger className="-ml-1  text-darkpurple font-bold border border-darkpurple hover:bg-darkpurple hover:text-purpleLight-100" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            </div>
          </header>
          {/* Main Container */}
          <main className="flex flex-1 flex-col gap-2">
            {children}
          </main>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
