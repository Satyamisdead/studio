
"use client";

import { usePathname } from 'next/navigation';
import AppSidebar from '@/components/AppSidebar';
import BottomNav from '@/components/BottomNav';
import { Toaster } from "@/components/ui/toaster";
import PwaInstallPrompt from '@/components/PwaInstallPrompt';
import ServerErrorOverlay from '@/components/ServerErrorOverlay';
import { useState } from 'react';

export default function ClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    const currentYear = new Date().getFullYear();
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    if (isAdminPage) {
      return (
        <>
            {children}
            <Toaster />
            <ServerErrorOverlay isVisible={isOverlayVisible} />
        </>
      );
    }
  
    return (
       <>
        <div className="flex min-h-screen bg-background text-foreground">
            <aside className="w-64 flex-shrink-0 border-r border-border/40 bg-card hidden md:flex flex-col">
            <AppSidebar />
            </aside>
            <div className="flex flex-1 flex-col">
            <main className="flex-grow pb-16 md:pb-0">
                {children}
            </main>
            <footer className="text-center py-4 text-sm text-muted-foreground border-t hidden md:block">
                Azoums Platform &copy; {currentYear}
            </footer>
            </div>
        </div>
        <BottomNav />
        <Toaster />
        <PwaInstallPrompt />
        <ServerErrorOverlay isVisible={isOverlayVisible} />
      </>
    );
}
