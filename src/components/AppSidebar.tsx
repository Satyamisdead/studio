
"use client";

import { BookOpen, Briefcase, Building, Wand2, Zap, LogIn, UserPlus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Courses', href: '/', icon: BookOpen },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Business', href: '/business', icon: Building },
  { name: 'AI Studio', href: '/ai', icon: Wand2 },
];

const authNavigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Sign In', href: '/sign-in', icon: LogIn },
    { name: 'Sign Up', href: '/sign-up', icon: UserPlus },
]

export default function AppSidebar() {
  const pathname = usePathname();

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
            </nav>
        </div>
      </div>
    </div>
  );
}
