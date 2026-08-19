'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowLeft, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function TenantAdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Platform Admin Dashboard</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Multi-Tenant Platform Administration</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Lugari is Tenant #1 of the reusable civic infrastructure platform architecture.
          </p>
        </div>

        <button disabled className="px-4 py-2.5 rounded-xl bg-muted border border-border text-muted-foreground font-bold text-xs opacity-60 cursor-not-allowed flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span>Create New Tenant (Coming Soon)</span>
        </button>
      </div>

      <div className="space-y-4 text-xs">
        <h2 className="font-extrabold text-base text-foreground">Registered Tenants</h2>

        {/* Tenant #1: Lugari */}
        <div className="p-6 bg-card border-2 border-emerald-600/80 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-lg">Lugari Digital Infrastructure</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Tenant #1 (Active)
              </span>
            </div>
            <span className="font-mono text-emerald-600 font-bold">lugari.ke</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border text-muted-foreground">
            <div>County: <strong className="text-foreground">Kakamega</strong></div>
            <div>Wards: <strong className="text-foreground">6 Wards</strong></div>
            <div>Population: <strong className="text-foreground">~223,000</strong></div>
            <div>Status: <strong className="text-emerald-600 font-bold">Production Ready</strong></div>
          </div>
        </div>

        {/* Tenant #2 Placeholder: Malava */}
        <div className="p-6 bg-muted/30 border border-dashed border-border rounded-2xl space-y-2 opacity-60">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground text-base">Malava Digital Infrastructure</span>
            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-bold text-[10px]">
              Future Tenant #2
            </span>
          </div>
          <p className="text-muted-foreground text-xs">Architectural configuration ready for deployment upon domain provision.</p>
        </div>
      </div>

    </div>
  );
}
