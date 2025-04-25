"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "../components/navbar";
import { StudioSidebar } from "../components/studio-sidebar";

const StudioLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <Navbar />
        <div className="flex min-h-screen mt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudioLayout;
