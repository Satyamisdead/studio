import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from '@/components/AppSidebar';

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
