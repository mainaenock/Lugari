'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ShieldCheck, CheckCircle2, ShieldAlert, ArrowLeft, Layers, FileText } from 'lucide-react';
import { AuditEvent } from '@/types';

export default function PlatformAdminDashboard() {
  const [logs, setLogs] = useState<AuditEvent[]>([]);

  useEffect(() => {
    AdminService.getAuditLogs().then(res => setLogs(res));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Banner */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-900/80 px-3 py-1 rounded-full text-xs font-bold text-indigo-300 border border-indigo-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Lugari Platform Operators Administration</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Platform System Oversight</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Governance, moderation queues, multi-tenant status, and immutable audit logs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/tenants"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
          >
            Manage Tenants
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Active Tenant</span>
          <div className="text-2xl font-black text-emerald-600">Tenant #1 (Lugari)</div>
          <span className="text-[10px] text-muted-foreground">lugari.ke</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Moderation Queue</span>
          <div className="text-2xl font-black text-amber-600">3 Items</div>
          <span className="text-[10px] text-amber-600 font-semibold">Pending Review</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Verified Institutions</span>
          <div className="text-2xl font-black text-foreground">12</div>
          <span className="text-[10px] text-muted-foreground">Active Credentials</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Platform Status</span>
          <div className="text-2xl font-black text-emerald-600">100% Healthy</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Cloudflare Workers</span>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm text-xs">
        <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" /> Immutable Platform Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User / Persona</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Summary</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-accent/50 transition">
                  <td className="p-3 font-mono">{log.timestamp}</td>
                  <td className="p-3 font-bold text-foreground">{log.user}</td>
                  <td className="p-3 uppercase font-mono text-emerald-700">{log.action}</td>
                  <td className="p-3">{log.resource}</td>
                  <td className="p-3 text-muted-foreground">{log.summary}</td>
                  <td className="p-3 font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
