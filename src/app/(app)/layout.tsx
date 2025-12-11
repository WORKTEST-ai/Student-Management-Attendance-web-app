'use server';

import Link from "next/link";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GraduationCap, Bell } from "lucide-react";
import { verifyToken } from '@/lib/jwt';

import { Button } from "@/components/ui/button";
import type { User, DecodedToken } from "@/lib/types";
import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/main-nav";
import { AppHeader } from "@/components/app-header";
import { UserProvider } from "@/hooks/use-user";

async function getAuthenticatedUser(): Promise<{ user: User, token: DecodedToken } | null> {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('auth');

    if (!tokenCookie) {
        redirect('/');
    }

    const decoded = await verifyToken(tokenCookie.value) as DecodedToken | null;

    if (!decoded || !decoded.role) {
        redirect('/');
    }
    
    const user: User = {
        id: decoded.userId || decoded.teacherId || decoded.email,
        name: decoded.name || decoded.email,
        email: decoded.email,
        role: decoded.role,
        avatar: `https://avatar.vercel.sh/${decoded.email}.png`
    };

    return { user, token: decoded };
}


export default async function AppLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const auth = await getAuthenticatedUser();
    
    if (!auth) {
        // This case should ideally be handled by middleware, but as a fallback
        return redirect('/');
    }
    
    const { user, token } = auth;
    const { role } = user;

    return (
        <UserProvider user={token}>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-card md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-16 items-center border-b px-4 lg:px-6">
                            <Link href={`/dashboard`} className="flex items-center gap-2 font-semibold">
                                <GraduationCap className="h-6 w-6 text-primary" />
                                <span className="">SMA</span>
                            </Link>
                            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                <Bell className="h-4 w-4" />
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <MainNav role={role} className="p-2 pt-4 lg:p-4" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <AppHeader user={user} role={role} title={"Dashboard"} />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background/95">
                        {children}
                    </main>
                </div>
            </div>
        </UserProvider>
    );
}
