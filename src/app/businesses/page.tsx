'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { BusinessesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Building2, Search, MapPin, PhoneCall, MessageSquare, ChevronRight, Megaphone, CheckCircle2 } from 'lucide-react';
import { Business, WardSlug, BusinessCategory } from '@/types';

export default function BusinessesPage() {
  const { tenant, dataSaver } = useAppState();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    BusinessesService.getAll({
      category: selectedCategory || undefined,
      ward: selectedWard as WardSlug || undefined,
      search: searchQuery || undefined,
    }).then(res => setBusinesses(res));
  }, [selectedCategory, selectedWard, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Hyperlocal Commercial Hub</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari Business Directory</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Discover verified local agrovets, hardware stores, solar repairers, mechanics, and transport providers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/advertise"
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold hover:bg-amber-300 transition shadow-sm flex items-center gap-1.5"
          >
            <Megaphone className="w-4 h-4" />
            <span>Advertise / List Your Business</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search agrovets, solar, hardware..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="agrovets">Agrovets & Farm Supplies</option>
          <option value="hardware">Hardware & Construction</option>
          <option value="electronics">Electronics & Solar Repair</option>
          <option value="restaurants">Restaurants & Accommodations</option>
          <option value="mechanics">Mechanics & Transport</option>
        </select>

        <select
          value={selectedWard}
          onChange={e => setSelectedWard(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Wards in Lugari</option>
          {tenant.wards.map(w => (
            <option key={w.id} value={w.slug}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(b => (
          <div
            key={b.id}
            className={`bg-card border rounded-2xl p-6 transition shadow-sm flex flex-col justify-between space-y-4 ${
              b.isSponsored ? 'border-amber-400/80 bg-amber-50/10 dark:bg-amber-950/10' : 'border-border hover:border-emerald-500'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {b.category}
                </span>
                {b.isSponsored ? (
                  <TrustBadge type="Sponsored" size="sm" />
                ) : (
                  <TrustBadge type={b.verified ? 'Verified Source' : 'Under Review'} size="sm" />
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground hover:text-emerald-600 transition">
                  <Link href={`/businesses/${b.slug}`}>{b.name}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{b.address}</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {b.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1 text-[10px]">
                {b.services.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-muted border border-border text-foreground font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Contact Bar */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
              <a
                href={`tel:${b.phone}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold flex items-center gap-1 hover:bg-emerald-900 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              {b.whatsapp ? (
                <a
                  href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1 hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <Link href={`/businesses/${b.slug}`} className="font-bold text-foreground hover:text-emerald-600 flex items-center gap-0.5">
                  <span>View Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
