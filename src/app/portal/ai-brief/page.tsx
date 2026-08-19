'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, AlertTriangle, TrendingUp, CheckCircle2, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AIExecutiveBriefPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/portal/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Institutional Dashboard</span>
      </Link>

      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-900/80 px-3 py-1 rounded-full text-xs font-bold text-purple-300 border border-purple-700">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>AI Intelligence Assistant</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight">Weekly Lugari Executive Brief</h1>
        <p className="text-xs sm:text-sm text-emerald-200">
          Automated weekly synthesis of citizen reports, project milestones, and ward sentiment.
        </p>

        <div className="p-3 bg-purple-950/60 border border-purple-800/80 rounded-xl text-[11px] text-purple-200 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-purple-300 shrink-0" />
          <span>AI-generated summary — review before official institutional action or publication.</span>
        </div>
      </div>

      {/* Brief Content Cards */}
      <div className="space-y-6 text-xs sm:text-sm">

        {/* Section 1: Top Concerns */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> 1. Top Community Concerns This Week
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">Electricity Outages in Mautuma:</strong> 3 duplicate reports logged regarding transformer oil leak at Mautuma Junction. 45 households affected. KPLC dispatched.
            </li>
            <li>
              <strong className="text-foreground">Bridge Road Washout in Lumakanda:</strong> Heavy rains caused deep potholes on Lumakanda feeder road. High risk for heavy milk transit trucks.
            </li>
          </ul>
        </div>

        {/* Section 2: Development Milestones */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 2. Development Milestones & Delays
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">Mautuma Secondary Lab (75% Complete):</strong> Roofing trusses inspected and passed. Internal plumbing underway for May commissioning.
            </li>
            <li>
              <strong className="text-foreground">Lugari Railway Feeder Road (Delayed):</strong> KeRRA engineer issued 60-day extension due to rainfall interfering with compaction.
            </li>
          </ul>
        </div>

        {/* Section 3: Sentiment & Opportunities */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
          <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> 3. Resident Engagement & Opportunities
          </h2>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">High Bursary Demand:</strong> Bursary application page received 4,200 views this week. Recommend releasing WhatsApp broadcast reminder for deadline.
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
