"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LogOut, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="!bg-background pt-[4rem]">
      <SidebarGroup>
        <SidebarGroupContent>
          <StudioSidebarHeader />
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Studio content"
                  isActive={pathname === "/studio"}
                  asChild
                >
                  <Link href="/studio">
                    <Video className="size-5" />
                    <span className="text-sm">Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit studio" asChild>
                  <Link href="/">
                    <LogOut className="size-5" />
                    <span className="text-sm">Exit studio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
