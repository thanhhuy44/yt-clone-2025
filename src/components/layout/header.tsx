"use client";

import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { SearchInput } from "./search-input";
import { AuthButton } from "./auth-button";

export const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 h-16 bg-white p-2 pr-5 z-50">
      <div className="flex items-center gap-x-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0 gap-x-2">
          <button>
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
        {/* Search */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-3xl flex-1">
            <SearchInput />
          </div>
        </div>
        {/* Login */}
        <div className="flex items-center gap-x-2">
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
