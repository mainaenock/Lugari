'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { ShieldCheck, Lock, Eye, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  const [personalization, setPersonalization] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Plain Language Trust Policy</span>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Privacy & Consent Center</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          How Lugari Digital Infrastructure protects citizen data, respects communication consent, and ensures political neutrality.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> First-Party Personalization Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lugari.ke does not use invasive third-party ad networks or cross-site tracking scripts. Your selected ward and saved job interests are stored locally on your device.
          </p>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="font-bold text-foreground">First-Party Recommendation Personalization</p>
            <p className="text-xs text-muted-foreground">Show local jobs and agricultural prices relevant to my ward.</p>
          </div>
          <input
            type="checkbox"
            checked={personalization}
            onChange={e => setPersonalization(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded"
          />
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h3 className="font-bold text-base text-foreground">Citizen Rights & Data Control</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-xl bg-card border border-border font-bold hover:bg-accent flex items-center gap-1.5 text-xs">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export My Data (JSON)</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold hover:bg-red-100 flex items-center gap-1.5 text-xs">
              <Trash2 className="w-4 h-4" />
              <span>Delete My Account Data</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
