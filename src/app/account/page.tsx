'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { User, MapPin, Bookmark, Bell, ShieldCheck, Smartphone, Settings, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ResidentAccountPage() {
  const { currentUser, currentWard, savedItemIds, tenant } = useAppState();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* User Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-800 text-amber-400 font-black text-2xl flex items-center justify-center">
            {currentUser?.name.charAt(0) || 'J'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-foreground">{currentUser?.name}</h1>
              <TrustBadge type="Verified Source" size="sm" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{currentUser?.phone} • Resident in {currentWard.name}</p>
          </div>
        </div>

        <Link
          href="/account/subscriptions"
          className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Bell className="w-4 h-4" />
          <span>Manage Alert Preferences</span>
        </Link>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">

        <Link href={`/wards/${currentWard.slug}`} className="p-6 bg-card border border-border hover:border-emerald-500 rounded-2xl transition space-y-2 group">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl w-fit">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-foreground group-hover:text-emerald-600">My Ward ({currentWard.name})</h3>
          <p className="text-muted-foreground">View local projects, school updates, and community notices for your ward.</p>
        </Link>

        <Link href="/account/saved" className="p-6 bg-card border border-border hover:border-emerald-500 rounded-2xl transition space-y-2 group">
          <div className="p-2.5 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-xl w-fit">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-foreground group-hover:text-emerald-600">Saved Items ({savedItemIds.length})</h3>
          <p className="text-muted-foreground">Quick access to bookmarked jobs, bursaries, and business profiles.</p>
        </Link>

        <Link href="/account/subscriptions" className="p-6 bg-card border border-border hover:border-emerald-500 rounded-2xl transition space-y-2 group">
          <div className="p-2.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-xl w-fit">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-foreground group-hover:text-emerald-600">Communication Consent Center</h3>
          <p className="text-muted-foreground">Granular SMS & WhatsApp notifications for bursary and emergency alerts.</p>
        </Link>

        <Link href="/privacy" className="p-6 bg-card border border-border hover:border-emerald-500 rounded-2xl transition space-y-2 group">
          <div className="p-2.5 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-xl w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-foreground group-hover:text-emerald-600">Privacy & Consent Settings</h3>
          <p className="text-muted-foreground">Manage first-party personalization toggles and data export options.</p>
        </Link>

      </div>

    </div>
  );
}
