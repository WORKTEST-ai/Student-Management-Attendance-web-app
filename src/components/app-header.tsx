import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import type { User, UserRole } from "@/lib/types";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    user: User;
    role: UserRole;
    title: string;
}

export function AppHeader({ user, role, title }: AppHeaderProps) {
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-4">
                    <Link
                        href="/dashboard"
                        className="mb-4 flex items-center gap-2 text-lg font-semibold"
                    >
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span className="">SMA</span>
                    </Link>
                    <MainNav role={role} />
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
                <div className="ml-auto flex-1 sm:flex-initial">
                    {/* Optional: Search bar could go here */}
                </div>
                <UserNav user={user} />
            </div>
        </header>
    );
}
