'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { AlertTriangle, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CorrectionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [resourceType, setResourceType] = useState('project');
  const [referenceOrTitle, setReferenceOrTitle] = useState('');
  const [correctionDetails, setCorrectionDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-slate-800">
          <AlertTriangle className="w-4 h-4" />
          <span>Public Trust & Editorial Integrity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Report Inaccuracy or Request Correction
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Lugari Digital Infrastructure maintains strict source attribution. If you spot incorrect project budgets, wrong business contacts, outdated deadlines, or misleading statements, submit a correction note.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
        <h2 className="text-xl font-bold text-foreground">Submit Correction Note</h2>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm font-bold text-center space-y-2">
            <p className="text-lg">✓ Correction Note Registered</p>
            <p className="font-normal text-xs text-emerald-800">
              Our fact-checking editor will review your submission against official gazettes or site verification within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-foreground mb-1">Content Type</label>
                <select
                  value={resourceType}
                  onChange={e => setResourceType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                >
                  <option value="project">Development Project Record</option>
                  <option value="business">Business Directory Listing</option>
                  <option value="opportunity">Job / Bursary Notice</option>
                  <option value="event">Community Event / Venue</option>
                  <option value="article">Gazette Article / News</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Title or Reference Code</label>
                <input
                  type="text"
                  value={referenceOrTitle}
                  onChange={e => setReferenceOrTitle(e.target.value)}
                  placeholder="E.g., LUG-CDF-2025-01 or Mautuma Secondary Lab"
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Explanation of Inaccuracy & Correct Information</label>
              <textarea
                rows={4}
                value={correctionDetails}
                onChange={e => setCorrectionDetails(e.target.value)}
                placeholder="Explain what is inaccurate and provide supporting evidence or source links if available..."
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-2 hover:bg-emerald-900 transition"
            >
              <Send className="w-4 h-4" />
              <span>Submit Correction Record</span>
            </button>
          </form>
        )}
      </div>

      {/* Transparent Correction Log */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm text-xs">
        <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Transparent Public Correction Log
        </h3>

        <div className="space-y-3">
          <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-1">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span className="font-bold text-foreground">Project: LUG-CDF-2024-08 (Lumakanda Hospital)</span>
              <span>15 Dec 2024</span>
            </div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              Corrected: Financial budget updated from initial estimate KSh 10M to final contract allocation KSh 12M after supplementary gazette approval.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
