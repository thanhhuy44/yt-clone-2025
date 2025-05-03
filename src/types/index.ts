import { LucideIcon } from "lucide-react";

export type LayoutProps = {
    children: React.ReactNode;
}

export type PageProps = {
    params: Promise<{
        [key:string]: string
    }>,
    searchParams:  Promise<{
        [key:string]: string | undefined
    }>
}

export type Nav = {
    title: string,
    url: string,
    icon: LucideIcon,
    auth?: boolean
}