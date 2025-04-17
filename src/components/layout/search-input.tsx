"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";

export const SearchInput = () => {
  return (
    <form className="flex items-center rounded-full w-full outline-hidden border">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 pl-4 py-2 pr-12 outline-none block"
      />
      <Button variant={"ghost"} type="submit" className="!px-5 !py-2.5 !h-full">
        <Search className="size-5" />
      </Button>
    </form>
  );
};
