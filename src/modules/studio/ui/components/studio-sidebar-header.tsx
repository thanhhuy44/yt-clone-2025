"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export const StudioSidebarHeader = () => {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user)
    return (
      <SidebarHeader className="flex flex-col pb-4 items-center justify-center gap-y-2">
        <Skeleton className="size-[112px] rounded-full"></Skeleton>
        <div className="flex flex-col items-center w-full gap-y-1">
          <Skeleton className="text-sm h-4 font-medium w-1/2"></Skeleton>
          <Skeleton className="text-xs h-3 text-muted-foreground w-2/3"></Skeleton>
        </div>
      </SidebarHeader>
    );

  if (state === "collapsed") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Your channel" asChild>
            <Link href="users/current">
              <UserAvatar
                imageUrl={user.imageUrl}
                name={user.fullName ?? ""}
                size="xs"
              />
              <span className="text-sm">Your profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarHeader className="flex flex-col pb-4 items-center justify-center gap-y-2">
      <Link href="/users/current">
        <UserAvatar
          imageUrl={user.imageUrl}
          name={user.fullName ?? ""}
          className="size-[112px] hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <h3 className="text-xs text-muted-foreground">{user.fullName}</h3>
      </div>
    </SidebarHeader>
  );
};
