'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { CasesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { AlertTriangle, Clock, CheckCircle2, MapPin, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CaseReport } from '@/types';

export default function CaseStatusPage({ params }: { params: Promise<{ reference: string }> }) {
  const resolvedParams = use(params);
  const reference = resolvedParams.reference;

  const [caseReport, setCaseReport] = useState<CaseReport | null>(null);

  useEffect(() => {
    CasesService.getByReference(reference).then(res => setCaseReport(res));
  }, [reference]);

  if (!caseReport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-base font-bold text-foreground">Searching case reference: {reference}...</p>
        <p className="text-xs text-muted-foreground">If not found, verify your reference code or submit a new report.</p>
        <Link href="/report" className="inline-block px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs">
          Report New Issue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/report" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Report Form</span>
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Case Reference Code</span>
            <div className="text-2xl font-black font-mono text-emerald-600">{caseReport.referenceCode}</div>
          </div>
          <span className="px-3 py-1.5 rounded-full font-bold text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
            Status: {caseReport.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground font-bold block">Issue Category:</span>
            <span className="font-semibold text-foreground uppercase">{caseReport.category}</span>
          </div>

          <div>
            <span className="text-muted-foreground font-bold block">Ward & Village:</span>
            <span className="font-semibold text-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{caseReport.villageLocation} ({caseReport.wardSlug.toUpperCase()})</span>
            </span>
          </div>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl border border-border text-xs space-y-1">
          <span className="font-bold text-foreground block text-[10px] uppercase">Problem Description</span>
          <p className="text-muted-foreground leading-relaxed">{caseReport.description}</p>
        </div>

        {caseReport.assignedTo && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Assigned Operational Body: {caseReport.assignedTo}</span>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-black text-lg text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-600" /> Resolution Audit Timeline
        </h3>

        <div className="space-y-4 text-xs">
          {caseReport.updates.map((up, idx) => (
            <div key={up.id} className="relative pl-6 border-l-2 border-emerald-600 space-y-1">
              <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-emerald-600" />
              <div className="flex justify-between font-bold text-foreground">
                <span>{up.status}</span>
                <span className="text-[10px] text-muted-foreground">{up.timestamp}</span>
              </div>
              <p className="text-muted-foreground">{up.note}</p>
              <span className="text-[10px] text-emerald-700 font-medium block">Updated by: {up.updatedBy}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
