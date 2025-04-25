"use client";

import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "size-9",
      xs: "size-4",
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
      "2xl": "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
  onClick?: VoidFunction;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  name,
  className,
  onClick,
  size,
}) => {
  return (
    <Avatar
      className={cn(avatarVariants({ size, className }))}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={name} />
    </Avatar>
  );
};
