"use client";

import { BookOpen, Briefcase, Building, Wand2, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Courses', href: '/', icon: BookOpen },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Business', href: '/business', icon: Building },
  { name: 'AI Studio', href: '/ai', icon: Wand2 },
];

interface AppSidebarProps {
  onLinkClick?: () => void;
}

export default function AppSidebar({ onLinkClick }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center border-b border-border/40 px-6" style={{minHeight: '65px'}}>
        <Link href="/" className="flex items-center gap-2" onClick={onLinkClick}>
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">Azoums</h1>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onLinkClick}
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
  );
}
