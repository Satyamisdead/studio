"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Briefcase, Building, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Courses', href: '/', icon: BookOpen },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Business', href: '/business', icon: Building },
  { name: 'AI Studio', href: '/ai', icon: Wand2 },
  { name: 'Account', href: '/sign-in', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/sign-in') {
      return pathname === '/sign-in' || pathname === '/sign-up';
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
