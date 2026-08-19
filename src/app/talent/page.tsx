'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { TalentService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Wrench, Search, MapPin, PhoneCall, CheckCircle2, MessageSquare } from 'lucide-react';
import { TalentProfile, WardSlug } from '@/types';

export default function TalentPage() {
  const { tenant } = useAppState();

  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    TalentService.getAll({
      category: selectedCategory || undefined,
      ward: selectedWard as WardSlug || undefined,
      search: searchQuery || undefined,
    }).then(res => setTalents(res));
  }, [selectedCategory, selectedWard, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Local Skilled Workforce</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari Talent & Artisans Directory</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Connect directly with verified local electricians, plumbers, developers, tutors, welders, and mechanics.
          </p>
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
            placeholder="Search electrician, plumber, developer..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Skill Categories</option>
          <option value="electrician">Electricians & Solar</option>
          <option value="plumber">Plumbers & Water Fittings</option>
          <option value="carpenter">Carpenters & Joiners</option>
          <option value="developer">Developers & IT Specialists</option>
          <option value="welder">Welders & Metal Fabricators</option>
          <option value="mechanic">Mechanics & Auto Repairs</option>
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

      {/* Talent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map(t => (
          <div
            key={t.id}
            className="bg-card border border-border rounded-2xl p-6 hover:border-emerald-500 transition shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                  {t.availability}
                </span>
                <TrustBadge type={t.verified ? 'Verified Source' : 'Under Review'} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground">{t.name}</h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">{t.profession}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.wardSlug.toUpperCase()} Ward</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {t.bio}
              </p>

              <div className="flex flex-wrap gap-1 text-[10px]">
                {t.skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-muted border border-border text-foreground font-medium">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
              <a
                href={`tel:${t.phone}`}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold flex items-center gap-1.5 hover:bg-emerald-900 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Worker</span>
              </a>

              {t.whatsapp && (
                <a
                  href={`https://wa.me/${t.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
