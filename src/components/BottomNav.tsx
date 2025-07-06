
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Briefcase, Building, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const accountHref = user ? '/profile' : '/sign-in';

  const navigation = [
    { name: 'Courses', href: '/', icon: BookOpen },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Business', href: '/business', icon: Building },
    { name: 'AI Studio', href: '/ai', icon: Wand2 },
    { name: 'Account', href: accountHref, icon: User },
  ];

  const isActive = (href: string) => {
    // Special handling for the Account tab to stay active on all related pages
    if (href === accountHref) {
      if(user) return pathname.startsWith('/profile');
      return ['/profile', '/sign-in', '/sign-up'].includes(pathname);
    }
    return pathname === href;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex justify-around h-16">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center w-full text-center transition-colors',
              isActive(item.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <item.icon className="h-6 w-6 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
