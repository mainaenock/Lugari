'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { Megaphone, Smartphone, MessageSquare, Send, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export default function AdvertisePage() {
  const { tenant } = useAppState();

  const [selectedWard, setSelectedWard] = useState<string>('mautuma');
  const [channel, setChannel] = useState<'SMS' | 'WhatsApp'>('SMS');
  const [submitted, setSubmitted] = useState(false);

  // Audience map simulation
  const audienceMap: Record<string, number> = {
    mautuma: 6241,
    lumakanda: 8120,
    lugari: 7450,
    chekalini: 5120,
    chevaywa: 5900,
    lwandeti: 4800,
  };

  const estimatedReach = audienceMap[selectedWard] || 6000;
  const estimatedCostKsh = (estimatedReach * 0.8).toFixed(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
          <Megaphone className="w-4 h-4" />
          <span>Local Business Growth & Targeted Reach</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Advertise Your Business Across Lugari
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Reach thousands of verified residents in Mautuma, Lumakanda, Lugari, Chekalini, Chevaywa, and Lwandeti through targeted directory listings, SMS, and WhatsApp alerts.
        </p>
      </div>

      {/* Campaign Estimator Interactive Widget */}
      <div className="bg-card border-2 border-emerald-600/60 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" /> Interactive Campaign Estimator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-foreground mb-1.5">Target Ward</label>
            <select
              value={selectedWard}
              onChange={e => setSelectedWard(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background font-medium focus:outline-none focus:border-emerald-600"
            >
              {tenant.wards.map(w => (
                <option key={w.id} value={w.slug}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1.5">Communication Channel</label>
            <select
              value={channel}
              onChange={e => setChannel(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-border bg-background font-medium focus:outline-none focus:border-emerald-600"
            >
              <option value="SMS">SMS Notification</option>
              <option value="WhatsApp">WhatsApp Broadcast</option>
            </select>
          </div>
        </div>

        {/* Reach Output Box */}
        <div className="bg-emerald-950 text-white p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Estimated Opted-in Audience</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {estimatedReach.toLocaleString()} Residents
            </div>
            <p className="text-[11px] text-emerald-200 mt-1">
              Opted-in for local business & agricultural updates in {tenant.wards.find(w => w.slug === selectedWard)?.name}.
            </p>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-emerald-800 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Estimated Campaign Cost</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              KSh {Number(estimatedCostKsh).toLocaleString()}
            </div>
            <p className="text-[10px] text-emerald-300 mt-1">Configurable rate (approx. KSh 0.80 per recipient).</p>
          </div>
        </div>

        <div className="p-3 bg-muted/40 rounded-xl text-[11px] text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Privacy Guaranteed: Recipient phone numbers are never exposed to advertisers.</span>
        </div>
      </div>

      {/* Campaign Request Form */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 text-xs">
        <h2 className="text-xl font-bold text-foreground">Request Advertisement Placement</h2>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm font-bold text-center space-y-2">
            <p className="text-lg">✓ Campaign Inquiry Received!</p>
            <p className="font-normal text-xs">Our commercial manager will contact your business within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-foreground mb-1">Business Name</label>
                <input
                  type="text"
                  placeholder="E.g., Mafuta Agrovet"
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Promotion Description / Message Text</label>
              <textarea
                rows={3}
                placeholder="Briefly describe your offer or product line..."
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Advertisement Inquiry</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
