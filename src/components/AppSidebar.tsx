
"use client";

import { BookOpen, Briefcase, Building, Wand2, Zap, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';

const navigation = [
  { name: 'Courses', href: '/', icon: BookOpen },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Business', href: '/business', icon: Building },
  { name: 'AI Studio', href: '/ai', icon: Wand2 },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Do not show sidebar on admin page
  if (pathname.startsWith('/admin')) {
      return null;
  }

  const authNavigation = user 
    ? [{ name: 'Profile', href: '/profile', icon: User }]
    : [
        { name: 'Sign In', href: '/sign-in', icon: LogIn },
        { name: 'Sign Up', href: '/sign-up', icon: UserPlus },
      ];

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center border-b border-border/40 px-6" style={{minHeight: '65px'}}>
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">Azoums</h1>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <nav className="space-y-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4">
           <Separator className="my-2 bg-border/40" />
           <nav className="space-y-1">
              {authNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}
              {user && (
                 <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 text-base font-medium"
                  >
                    <LogOut className="mr-4 h-6 w-6 flex-shrink-0" />
                    <span>Sign Out</span>
                  </Button>
              )}
            </nav>
        </div>
      </div>
    </div>
  );
}
