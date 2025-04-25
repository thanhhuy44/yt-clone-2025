"use client";

import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { AuthButton } from "./auth-button";
import { useSidebar } from "@/components/ui/sidebar";
import { StudioUploadModal } from "./studio-upload-modal";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="fixed w-full top-0 inset-x-0 h-16 bg-white p-2 pr-5 z-50 border-b shadow-md">
      <div className="flex h-full items-center gap-x-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0 gap-x-2">
          <button
            className="size-8 flex items-center justify-center"
            onClick={toggleSidebar}
          >
            <AlignJustify />
          </button>
          <Link href="/studio">
            <Image
              src="/youtube-studio.png"
              width={120}
              height={60}
              alt="Youtube logo"
              className=""
            />
          </Link>
        </div>
        {/* Search */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-3xl flex-1"></div>
        </div>
        {/* Login */}
        <div className="flex items-center gap-x-2">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
