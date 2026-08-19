'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { BusinessesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Building2, MapPin, PhoneCall, MessageSquare, ArrowLeft, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Business } from '@/types';

export default function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    BusinessesService.getBySlug(slug).then(res => setBusiness(res));
  }, [slug]);

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold text-muted-foreground">Loading business profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/businesses" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Business Directory</span>
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
            {business.category}
          </span>
          <TrustBadge type={business.verified ? 'Verified Source' : 'Under Review'} size="md" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">{business.name}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{business.address}, {business.wardSlug.toUpperCase()} Ward</span>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {business.fullDescription}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Opening Hours</span>
            <span className="font-bold text-foreground mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{business.openingHours}</span>
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Phone Number</span>
            <a href={`tel:${business.phone}`} className="font-bold text-emerald-700 hover:underline mt-0.5 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{business.phone}</span>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-wrap items-center gap-3">
          <a
            href={`tel:${business.phone}`}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold text-xs hover:bg-emerald-900 transition flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Business</span>
          </a>

          {business.whatsapp && (
            <a
              href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {!business.isClaimed && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-amber-900 dark:text-amber-300">Are you the owner of {business.name}?</p>
            <p className="text-amber-800 dark:text-amber-400 mt-0.5">Claim this profile to update business hours, products, and contact info.</p>
          </div>
          <Link
            href="/advertise"
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition shrink-0"
          >
            Claim Listing
          </Link>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
        <h3 className="font-extrabold text-base text-foreground">Services & Products Offered</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {business.services.map((svc, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{svc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
