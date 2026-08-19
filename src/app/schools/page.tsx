'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { SchoolsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { BookOpen, Search, MapPin, Users, PhoneCall, Award, GraduationCap, ChevronRight } from 'lucide-react';
import { School, WardSlug } from '@/types';

export default function SchoolsPage() {
  const { tenant, dataSaver } = useAppState();

  const [schools, setSchools] = useState<School[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    SchoolsService.getAll({
      ward: selectedWard as WardSlug || undefined,
      level: selectedLevel || undefined,
      search: searchQuery || undefined,
    }).then(res => setSchools(res));
  }, [selectedWard, selectedLevel, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Educational Directory & Academic Hub</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Schools & TVETs in Lugari</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Directory of public secondary schools, primary institutions, and technical colleges across all 6 wards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/education"
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition shadow-sm"
          >
            Bursary Application Centre →
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
            placeholder="Search school name..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Education Levels</option>
          <option value="Secondary">Secondary Schools</option>
          <option value="TVET">TVET / Colleges</option>
          <option value="Primary">Primary Schools</option>
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

      {/* Schools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map(school => (
          <div
            key={school.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500 transition shadow-sm flex flex-col justify-between"
          >
            {!dataSaver && school.photoUrl && (
              <div className="h-44 bg-muted relative overflow-hidden">
                <img src={school.photoUrl} alt={school.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <TrustBadge type="Verified Source" size="sm" />
                </div>
              </div>
            )}

            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {school.level} • {school.type}
                </span>
                <span className="font-semibold text-muted-foreground capitalize">{school.wardSlug} Ward</span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground hover:text-emerald-600 transition">
                  <Link href={`/schools/${school.slug}`}>{school.name}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{school.address}</span>
                </p>
              </div>

              {school.academicPerformanceNote && (
                <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs text-muted-foreground">
                  <span className="font-bold text-foreground block text-[10px] uppercase mb-0.5">Academic Performance</span>
                  {school.academicPerformanceNote}
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
                {school.facilities.slice(0, 3).map((f, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-muted border border-border text-foreground">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs">
              <a href={`tel:${school.contactPhone}`} className="font-bold text-emerald-700 flex items-center gap-1 hover:underline">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{school.contactPhone}</span>
              </a>
              <Link href={`/schools/${school.slug}`} className="font-extrabold text-foreground hover:text-emerald-600 flex items-center gap-0.5">
                <span>School Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
