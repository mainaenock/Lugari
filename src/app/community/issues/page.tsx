'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CasesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { AlertTriangle, MapPin, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CaseReport } from '@/types';

export default function CommunityIssuesDashboard() {
  const [cases, setCases] = useState<CaseReport[]>([]);

  useEffect(() => {
    CasesService.getAll().then(res => setCases(res));
  }, []);

  const totalCases = cases.length;
  const inProgressCount = cases.filter(c => c.status === 'Action in Progress').length;
  const resolvedCount = cases.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Anonymized Civic Data</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Public Community Issues Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Aggregated statistics and resolution status of citizen reports across Lugari Sub-County.
          </p>
        </div>

        <Link
          href="/report"
          className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition flex items-center gap-1.5 shadow-sm"
        >
          <AlertTriangle className="w-4 h-4 stroke-[2.5px]" />
          <span>Report an Issue</span>
        </Link>
      </div>

      {/* Aggregated KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Issues Logged</span>
          <div className="text-2xl font-black text-foreground">{totalCases}</div>
          <span className="text-[10px] text-muted-foreground">All Wards</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Action in Progress</span>
          <div className="text-2xl font-black text-amber-600">{inProgressCount}</div>
          <span className="text-[10px] text-amber-600 font-semibold">Dispatched to Utility/Works</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Resolved / Closed</span>
          <div className="text-2xl font-black text-emerald-600">{resolvedCount}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Verified fixed</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Top Category</span>
          <div className="text-lg font-black text-foreground uppercase">Electricity & Roads</div>
          <span className="text-[10px] text-muted-foreground">65% of reports</span>
        </div>
      </div>

      {/* Case List (Anonymized) */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-extrabold text-base text-foreground">Recent Public Anonymized Reports</h3>

        <div className="space-y-3">
          {cases.map(c => (
            <div key={c.id} className="p-4 bg-muted/30 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-foreground">{c.referenceCode}</span>
                  <span className="font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    {c.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Submitted: {c.submittedAt}</span>
                </div>
                <p className="font-semibold text-foreground">{c.villageLocation} ({c.wardSlug.toUpperCase()} Ward)</p>
                <p className="text-muted-foreground line-clamp-1">{c.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">
                  {c.status}
                </span>
                <Link
                  href={`/report/status/${c.referenceCode}`}
                  className="p-2 rounded bg-card border border-border hover:bg-accent text-foreground font-bold"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
