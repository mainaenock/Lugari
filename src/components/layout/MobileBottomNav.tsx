'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppState } from '@/context/AppStateContext';
import { Home, MapPin, Briefcase, AlertTriangle, User } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { currentWard } = useAppState();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'My Ward', href: `/wards/${currentWard.slug}`, icon: MapPin },
    { label: 'Opportunities', href: '/opportunities', icon: Briefcase },
    { label: 'Report', href: '/report', icon: AlertTriangle, highlight: true },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : item.highlight
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.highlight ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
