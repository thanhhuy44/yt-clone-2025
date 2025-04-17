import { LucideIcon } from "lucide-react";

export type LayoutProps = {
    children: React.ReactNode;
}

export type Nav = {
    title: string,
    url: string,
    icon: LucideIcon,
    auth?: boolean
}