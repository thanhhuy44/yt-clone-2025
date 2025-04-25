"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "../components/navbar";
import { HomeSidebar } from "../components/home-sidebar";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <Navbar />
        <div className="flex min-h-screen mt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomeLayout;
