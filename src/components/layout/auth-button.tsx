import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";

export const AuthButton = () => {
  return (
    <Button variant="outline" className="rounded-full">
      <UserCircle className="!size-5" />
      Sign in
    </Button>
  );
};
