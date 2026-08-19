'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AgricultureService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Wheat, DollarSign, Calendar, MapPin, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { AgriculturePrice } from '@/types';

export default function AgriculturePage() {
  const [prices, setPrices] = useState<AgriculturePrice[]>([]);

  useEffect(() => {
    AgricultureService.getMarketPrices().then(res => setPrices(res));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Hyperlocal Farming Intelligence</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari Agriculture & Market Hub</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time market prices, extension advice, agrovet directory, and crop/livestock opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/businesses?category=agrovets"
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition shadow-sm"
          >
            Find Certified Agrovets →
          </Link>
        </div>
      </div>

      {/* Commodity Market Prices Table */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-600" /> Daily Commodity Market Prices
            </h2>
            <p className="text-xs text-muted-foreground">Monitored directly from Mautuma, Lumakanda, Lugari, and Lwandeti markets.</p>
          </div>
          <TrustBadge type="Verified Source" size="sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map(item => (
            <div key={item.id} className="p-4 bg-muted/40 border border-border rounded-2xl space-y-2">
              <div className="text-[10px] font-bold uppercase text-muted-foreground">{item.marketName}</div>
              <div className="font-extrabold text-foreground text-sm">{item.item}</div>
              <div className="text-2xl font-black text-emerald-700">
                KSh {item.priceKsh.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ {item.unit}</span>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Updated: {item.updatedDate}</span>
                <span className="font-bold text-emerald-600">Fresh Monitor</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extension & Farmer Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-base text-foreground">Soil Acidity Treatment Guide</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Lugari soils often experience acidity due to continuous maize cropping. Learn how to apply agricultural lime before planting season.
          </p>
          <Link href="/news" className="text-xs font-bold text-emerald-600 hover:underline block pt-2">
            Read Advisory Article →
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-base text-foreground">Dairy Silage Preparation</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Preserve fodder during the dry season using pit and bag silage techniques for high milk yields in Mautuma and Lugari wards.
          </p>
          <Link href="/news" className="text-xs font-bold text-emerald-600 hover:underline block pt-2">
            Read Dairy Guide →
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-base text-foreground">High-Value Avocado Cultivation</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Export grade Hass Avocado seedling distribution schedules for Lugari smallholders through local youth groups.
          </p>
          <Link href="/opportunities" className="text-xs font-bold text-emerald-600 hover:underline block pt-2">
            View Grant Schemes →
          </Link>
        </div>
      </div>

    </div>
  );
}
