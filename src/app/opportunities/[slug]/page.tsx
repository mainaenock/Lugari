'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { OpportunitiesService } from '@/services';
import { useAppState } from '@/context/AppStateContext';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  Briefcase, Calendar, MapPin, CheckCircle2,
  ArrowLeft, Bookmark, Share2, Send, ExternalLink, ShieldCheck
} from 'lucide-react';
import { Opportunity } from '@/types';

export default function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { toggleSaveItem, isSaved } = useAppState();

  const [opp, setOpp] = useState<Opportunity | null>(null);

  useEffect(() => {
    OpportunitiesService.getBySlug(slug).then(res => setOpp(res));
  }, [slug]);

  if (!opp) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold text-muted-foreground">Loading opportunity details...</p>
      </div>
    );
  }

  const saved = isSaved(opp.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Back Button */}
      <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Opportunities</span>
      </Link>

      {/* Main Opportunity Card Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            {opp.category}
          </span>
          <TrustBadge type={opp.organizationVerified ? 'Verified Source' : 'Under Review'} size="md" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
            {opp.title}
          </h1>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{opp.organizationName}</span>
          </p>
        </div>

        {/* Overview Box */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Location</span>
            <span className="font-bold text-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{opp.location}</span>
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Value / Salary</span>
            <span className="font-bold text-foreground mt-0.5">{opp.salaryOrValue}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Closing Deadline</span>
            <span className="font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{opp.deadline}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => toggleSaveItem(opp.id)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              saved ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-card border-border hover:bg-accent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{saved ? 'Saved in Account' : 'Save Opportunity'}</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Check out this opportunity in Lugari: ${opp.title} - https://lugari.ke/opportunities/${opp.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm">
        <div>
          <h3 className="font-extrabold text-base text-foreground mb-2">Description & Background</h3>
          <p className="text-muted-foreground leading-relaxed">{opp.description}</p>
        </div>

        <div>
          <h3 className="font-extrabold text-base text-foreground mb-2">Eligibility Criteria</h3>
          <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
            {opp.eligibility.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-extrabold text-base text-foreground mb-2">Required Application Documents</h3>
          <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
            {opp.requirements.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-2">
          <h3 className="font-extrabold text-base text-foreground">How to Apply</h3>
          <p className="text-muted-foreground leading-relaxed">{opp.applicationInstructions}</p>
        </div>
      </div>

    </div>
  );
}
