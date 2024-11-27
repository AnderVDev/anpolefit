"use client";

import * as React from "react";
import { Calculator, Home, Inbox, Search, Settings } from "lucide-react";

import { NavBasic } from "@/components/nav-basic";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";

const data = [
  {
    title: "Overview",
    url: "/overview",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Calculator",
    url: "/calculator",
    icon: Calculator,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    return null;
  }
  const { name, email, image } = currentUser;
  const user = {
    name,
    email,
    avatar: image,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header section */}
      <SidebarHeader>
        <a href="/">
        <Image
          src="/assets/Logo Anpolefit_16.png"
          alt="Logo"
          className="h-full w-full object-cover"
          width={200} // Desired width
          height={100} // Proportional height to maintain the aspect ratio
          priority
        />
        </a>
        
      </SidebarHeader>
      {/* Main section */}
      <SidebarContent>
        <NavBasic items={data} />
      </SidebarContent>

      {/* Footer section */}
      <SidebarFooter>{currentUser && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
