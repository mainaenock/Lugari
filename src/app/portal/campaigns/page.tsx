'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { Send, Smartphone, MessageSquare, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WardSlug } from '@/types';

export default function CampaignsPage() {
  const { tenant } = useAppState();

  const [selectedWard, setSelectedWard] = useState<string>('mautuma');
  const [interest, setInterest] = useState<string>('agriculture');
  const [channel, setChannel] = useState<'SMS' | 'WhatsApp'>('SMS');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reachEstimate = selectedWard === 'all' ? 37631 : 6241;
  const costEstimateKsh = (reachEstimate * 0.8).toFixed(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/portal/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Institutional Dashboard</span>
      </Link>

      <div>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Ward Communication Campaign Builder</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Draft and broadcast targeted institutional notices via SMS and WhatsApp to opted-in residents.
        </p>
      </div>

      {/* Estimator Summary Banner */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center shadow-lg">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Estimated Audience Reach</span>
          <div className="text-3xl font-black text-white mt-1">
            {reachEstimate.toLocaleString()} Opted-in Citizens
          </div>
          <p className="text-[11px] text-emerald-200 mt-1">Targeted by Ward & Interest Category</p>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-emerald-800 pt-4 sm:pt-0 sm:pl-6">
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Estimated Campaign Budget</span>
          <div className="text-2xl font-black text-amber-400 mt-1">
            KSh {Number(costEstimateKsh).toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-300 mt-1">Rate: KSh 0.80 per message</p>
        </div>
      </div>

      {/* Campaign Form */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 text-xs shadow-sm">
        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm font-bold text-center space-y-2">
            <p className="text-lg">✓ Campaign Submitted for Approval</p>
            <p className="font-normal text-xs text-emerald-800">
              Institutional campaigns require senior administrator review before broadcast.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-foreground mb-1">Target Ward</label>
                <select
                  value={selectedWard}
                  onChange={e => setSelectedWard(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                >
                  <option value="all">All Wards in Lugari</option>
                  {tenant.wards.map(w => (
                    <option key={w.id} value={w.slug}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Interest Category</label>
                <select
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                >
                  <option value="agriculture">Agriculture & Farming</option>
                  <option value="bursary">Bursaries & Education</option>
                  <option value="jobs">Employment & Youth</option>
                  <option value="emergency">Emergency Alerts</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Channel</label>
                <select
                  value={channel}
                  onChange={e => setChannel(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                >
                  <option value="SMS">SMS Message</option>
                  <option value="WhatsApp">WhatsApp Broadcast</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Campaign Message Content</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="LUGARI BURSARY ALERT: Applications for FY 2024/25 bursaries are open till 25 March. Apply at lugari.ke/education or visit Chief's office..."
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none font-mono"
                required
              />
              <p className="text-[10px] text-muted-foreground mt-1">Characters: {message.length} / 160 (1 SMS Credit)</p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-2 hover:bg-emerald-900 transition"
            >
              <Send className="w-4 h-4" />
              <span>Submit Campaign for Approval</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
