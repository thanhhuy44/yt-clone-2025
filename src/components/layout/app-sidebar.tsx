"use client";
import { Nav } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import {
  AlignJustify,
  Flame,
  History,
  Home,
  ListVideo,
  PlayCircle,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const primaryNavs: Nav[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: Flame,
  },
  {
    title: "Subscriptions",
    url: "/supscriptions",
    icon: PlayCircle,
    auth: true,
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

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="!bg-background !border-r-0">
      <SidebarHeader className="mb-4">
        <div className="py-2 px-2 flex items-center flex-shrink-0 gap-x-2">
          <button onClick={toggleSidebar}>
            <AlignJustify />
          </button>
          <Link href="/">
            <Image
              src="/logo.png"
              width={120}
              height={60}
              alt="Youtube logo"
              className=""
            />
          </Link>
        </div>
      </SidebarHeader>
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
