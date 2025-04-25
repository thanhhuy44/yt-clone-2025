"use client";
import { Nav } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Flame,
  History,
  Home,
  ListVideo,
  PlayCircle,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";

const primaryNavs: Nav[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Subscriptions",
    url: "/supscriptions",
    icon: PlayCircle,
    auth: true,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: Flame,
  },
];

const personalNavs: Nav[] = [
  {
    title: "History",
    url: "/history",
    icon: History,
    auth: true,
  },
  {
    title: "Liked videos",
    url: "/playlists/liked",
    icon: ThumbsUp,
    auth: true,
  },
  {
    title: "All playlists",
    url: "/playlists",
    icon: ListVideo,
    auth: true,
  },
];

export const HomeSidebar = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  return (
    <Sidebar
      collapsible="icon"
      className="!bg-background !border-r-0 pt-[4rem]"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavs.map((nav, index) => {
                const Icon = nav.icon;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      isActive={false}
                      tooltip={nav.title}
                      asChild
                      onClick={(e) => {
                        if (!isSignedIn && nav.auth) {
                          e.preventDefault();
                          return clerk.openSignIn();
                        }
                      }}
                    >
                      <Link href={nav.url}>
                        <Icon className="!size-5" />
                        <span>{nav.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>You</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalNavs.map((nav, index) => {
                const Icon = nav.icon;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      isActive={false}
                      tooltip={nav.title}
                      asChild
                      onClick={(e) => {
                        if (!isSignedIn) {
                          e.preventDefault();
                          return clerk.openSignIn();
                        }
                      }}
                    >
                      <Link href={nav.url}>
                        <Icon className="!size-5" />
                        <span>{nav.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
