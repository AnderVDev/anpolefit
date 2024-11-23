import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
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
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          {/* <Separator orientation="horizontal" className=" " /> */}
          {/* Main Container */}
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">

              <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
                  {children}
                </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
