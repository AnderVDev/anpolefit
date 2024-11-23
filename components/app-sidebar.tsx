"use client";

import * as React from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,

} from "lucide-react";

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
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

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
        <Image
          src="/assets/Logo Anpolefit_16.png"
          alt={"Logo"}
          width={128}
          height={32}
        />
      </SidebarHeader>
      {/* Main section */}
      <SidebarContent>
        <NavBasic items={data} />
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      {/* Footer section */}
      <SidebarFooter>{currentUser && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
