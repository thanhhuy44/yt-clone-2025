"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Clapperboard, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<Clapperboard className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
        {/* add menu  */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="rounded-full text-blue-500 hover:text-white hover:bg-blue-500"
          >
            <UserCircle className="!size-5" />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
