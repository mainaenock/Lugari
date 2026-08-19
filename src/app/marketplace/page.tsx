'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { MarketplaceService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ShoppingBag, Search, MapPin, PhoneCall, ShieldAlert, Tag, Filter } from 'lucide-react';
import { MarketplaceListing, WardSlug } from '@/types';

export default function MarketplacePage() {
  const { tenant, dataSaver } = useAppState();

  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    MarketplaceService.getAll({
      category: selectedCategory || undefined,
      ward: selectedWard as WardSlug || undefined,
      search: searchQuery || undefined,
    }).then(res => setListings(res));
  }, [selectedCategory, selectedWard, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Hyperlocal Peer-to-Peer Trade</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari Community Marketplace</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Buy and sell farm produce, livestock, timber, machinery, and electronics directly within Lugari.
          </p>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center gap-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
        <div>
          <span className="font-bold text-amber-300 block">Marketplace Safety Guidelines:</span>
          Always inspect livestock and farm produce in person in a public market before sending M-Pesa payments. Report fraudulent listings immediately.
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
            placeholder="Search Friesian heifer, maize bags, land..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Marketplace Categories</option>
          <option value="livestock">Livestock & Cattle</option>
          <option value="farm_produce">Farm Produce & Grain</option>
          <option value="equipment">Farm Equipment & Tools</option>
          <option value="property">Land & Property</option>
          <option value="electronics">Electronics</option>
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

      {/* Marketplace Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(item => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500 transition shadow-sm flex flex-col justify-between"
          >
            {!dataSaver && item.images?.[0] && (
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <TrustBadge type={item.sellerVerified ? 'Verified Source' : 'Community Report'} size="sm" />
                </div>
              </div>
            )}

            <div className="p-6 space-y-3 flex-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded uppercase">
                  {item.category.replace('_', ' ')}
                </span>
                <span className="font-semibold text-muted-foreground capitalize">{item.wardSlug} Ward</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground hover:text-emerald-600 transition">
                  <Link href={`/marketplace/${item.slug}`}>{item.title}</Link>
                </h3>
                <div className="text-xl font-black text-emerald-700 mt-1">
                  KSh {item.priceKsh.toLocaleString()}
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block">Seller</span>
                <span className="font-bold text-foreground">{item.sellerName}</span>
              </div>
              <a
                href={`tel:${item.sellerPhone}`}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold flex items-center gap-1 hover:bg-emerald-900 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Seller</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
