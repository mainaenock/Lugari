'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { EventsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Calendar, Search, MapPin, Users, ArrowRight, Clock, Video } from 'lucide-react';
import { Event, WardSlug } from '@/types';

export default function EventsPage() {
  const { tenant } = useAppState();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    EventsService.getAll({
      ward: selectedWard as WardSlug || undefined,
      search: searchQuery || undefined,
    }).then(res => setEvents(res));
  }, [selectedWard, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Community & Public Meetings</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Events Calendar in Lugari</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Public participation forums, agriculture field days, sports tournaments, and official townhalls.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search public forum, training, venue..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

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

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(evt => (
          <div
            key={evt.id}
            className="bg-card border border-border rounded-2xl p-6 hover:border-emerald-500 transition shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  {evt.category.replace('_', ' ')}
                </span>
                <TrustBadge type={evt.organizerVerified ? 'Verified Source' : 'Under Review'} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground hover:text-emerald-600 transition">
                  <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{evt.venue} ({evt.wardSlug.toUpperCase()} Ward)</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {evt.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{evt.startDate}</span>
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.startTime}</span>
                </span>
              </div>

              <Link
                href={`/events/${evt.slug}`}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-900 transition flex items-center gap-1"
              >
                <span>RSVP & Agenda</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
