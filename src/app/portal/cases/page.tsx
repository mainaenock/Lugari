'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CasesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { AlertTriangle, Sparkles, ShieldCheck, MapPin, ArrowLeft, Send, CheckCircle2, Clock } from 'lucide-react';
import { CaseReport, CaseStatus } from '@/types';

export default function CaseManagementPortal() {
  const [cases, setCases] = useState<CaseReport[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseReport | null>(null);
  const [updateStatus, setUpdateStatus] = useState<CaseStatus>('Action in Progress');
  const [updateNote, setUpdateNote] = useState('');

  useEffect(() => {
    CasesService.getAll().then(res => {
      setCases(res);
      if (res.length > 0) setSelectedCase(res[0]);
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !updateNote) return;

    const updated = await CasesService.updateStatus(
      selectedCase.id,
      updateStatus,
      updateNote,
      'Lugari Operations Center'
    );

    if (updated) {
      setSelectedCase({ ...updated });
      setUpdateNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/portal/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Institutional Dashboard</span>
      </Link>

      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-black text-foreground tracking-tight">Case & Citizen Issue Triage Portal</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review citizen submissions, verify AI classification, assign technical teams, and issue public status updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cases List */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs uppercase text-muted-foreground tracking-wider">Incoming Citizen Reports ({cases.length})</h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {cases.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selectedCase?.id === c.id
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md'
                    : 'border-border bg-card hover:bg-accent'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-mono font-bold text-foreground">{c.referenceCode}</span>
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {c.status}
                  </span>
                </div>
                <p className="font-bold text-xs text-foreground uppercase">{c.category}</p>
                <p className="text-[11px] text-muted-foreground truncate">{c.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Case Detail & Actions */}
        {selectedCase && (
          <div className="lg:col-span-2 space-y-6">

            {/* Case Overview Card */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm text-xs">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Reference Code</span>
                  <p className="text-xl font-black font-mono text-emerald-600">{selectedCase.referenceCode}</p>
                </div>
                <TrustBadge type="Community Report" size="md" />
              </div>

              {/* AI Triage Banner */}
              {selectedCase.aiClassification && (
                <div className="p-4 bg-purple-950 text-purple-100 rounded-xl space-y-2 border border-purple-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-300" /> AI Classification Assistant
                    </span>
                    <span className="text-[10px] bg-purple-800 px-2 py-0.5 rounded text-purple-200">
                      Confidence: {(selectedCase.aiClassification.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-purple-900">
                    <div>Category: <strong className="text-white uppercase">{selectedCase.aiClassification.category}</strong></div>
                    <div>Suggested Priority: <strong className="text-amber-300">{selectedCase.aiClassification.suggestedPriority}</strong></div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-muted-foreground font-bold block">Location Details:</span>
                <p className="font-semibold text-foreground flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{selectedCase.villageLocation} ({selectedCase.wardSlug.toUpperCase()} Ward)</span>
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-muted-foreground font-bold block">Full Description:</span>
                <p className="text-muted-foreground leading-relaxed p-3 bg-muted/40 rounded-xl border border-border">
                  {selectedCase.description}
                </p>
              </div>
            </div>

            {/* Action Form */}
            <form onSubmit={handleUpdate} className="bg-card border border-border rounded-2xl p-6 space-y-4 text-xs shadow-sm">
              <h3 className="font-extrabold text-base text-foreground">Update Case Status & Action Note</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Select New Status</label>
                  <select
                    value={updateStatus}
                    onChange={e => setUpdateStatus(e.target.value as CaseStatus)}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none font-medium"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Verified">Verified</option>
                    <option value="Referred">Referred to Utility</option>
                    <option value="Action in Progress">Action in Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Operational Action Note</label>
                <textarea
                  rows={3}
                  value={updateNote}
                  onChange={e => setUpdateNote(e.target.value)}
                  placeholder="Describe technical team assignment, KPLC/water ticket reference, or completion note..."
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-2 hover:bg-emerald-900 transition"
              >
                <Send className="w-4 h-4" />
                <span>Save Status & Publish Public Audit Entry</span>
              </button>
            </form>

          </div>
        )}

      </div>

    </div>
  );
}
