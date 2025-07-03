import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from '@/components/AppSidebar';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Azoums Platform',
  description: 'Courses, Jobs, Business, and AI Tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex min-h-screen bg-background text-foreground">
          <aside className="w-64 flex-shrink-0 border-r border-border/40 bg-card hidden md:flex flex-col">
            <AppSidebar />
          </aside>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-[65px] items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur-sm md:hidden">
               <Link href="/" className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline">Azoums</span>
              </Link>
              <MobileNav />
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="text-center py-4 text-sm text-muted-foreground border-t">
              Azoums Platform &copy; {new Date().getFullYear()}
            </footer>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
