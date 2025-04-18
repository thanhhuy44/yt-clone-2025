"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
        {/* add menu  */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" className="rounded-full">
            <UserCircle className="!size-5" />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
