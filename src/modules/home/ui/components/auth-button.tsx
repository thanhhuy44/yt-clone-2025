"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
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
