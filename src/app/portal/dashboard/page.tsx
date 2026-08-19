'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { CasesService, ProjectsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  Building2, Sparkles, AlertTriangle, FileText, Send,
  Users, BarChart3, Calendar, CheckCircle2, ArrowRight, MessageSquare, Smartphone
} from 'lucide-react';
import { CaseReport, Project } from '@/types';

export default function InstitutionalDashboard() {
  const { tenant, currentUser } = useAppState();

  const [cases, setCases] = useState<CaseReport[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    CasesService.getAll().then(res => setCases(res));
    ProjectsService.getAll().then(res => setProjects(res));
  }, []);

  const openCases = cases.filter(c => c.status !== 'Resolved' && c.status !== 'Closed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Banner */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-emerald-700">
            <Building2 className="w-4 h-4" />
            <span>Lugari Sub-County & NG-CDF Institutional Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Executive Operations Portal</h1>
          <p className="text-xs sm:text-sm text-emerald-200">
            Authenticated interface for MP Office, NG-CDF Staff, and Ward Administrators.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/ai-brief"
            className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Weekly Executive Brief</span>
          </Link>
          <Link
            href="/portal/campaigns"
            className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center gap-1.5 border border-emerald-700"
          >
            <Send className="w-4 h-4" />
            <span>Targeted SMS/WhatsApp Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Unresolved Cases</span>
          <div className="text-2xl font-black text-amber-600">{openCases.length}</div>
          <span className="text-[10px] text-amber-600 font-semibold">Requires Dispatch</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Active Projects</span>
          <div className="text-2xl font-black text-foreground">
            {projects.filter(p => p.status === 'In Progress').length}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Under Construction</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Opted-in SMS Audience</span>
          <div className="text-2xl font-black text-emerald-600">37,631</div>
          <span className="text-[10px] text-muted-foreground">Across 6 Wards</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Upcoming Public Events</span>
          <div className="text-2xl font-black text-foreground">2</div>
          <span className="text-[10px] text-muted-foreground">Public Forums</span>
        </div>
      </div>

      {/* Quick Operations Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Case Management */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Case Management & AI Triage
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Review incoming citizen reports, view AI priority classification, and assign cases to utility teams.
            </p>
          </div>
          <Link
            href="/portal/cases"
            className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center justify-center gap-1.5"
          >
            <span>Open Case Portal ({openCases.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Management */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Project Milestones Management
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Upload site photos, update completion percentages, and publish budget execution reports.
            </p>
          </div>
          <Link
            href="/portal/projects"
            className="w-full py-2.5 rounded-xl bg-card border border-border font-bold text-xs hover:bg-accent transition flex items-center justify-center gap-1.5"
          >
            <span>Manage Development Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Campaign Builder */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" /> Ward Audience Campaign Builder
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Broadcast targeted SMS and WhatsApp updates to farmers, parents, or job seekers without phone exposure.
            </p>
          </div>
          <Link
            href="/portal/campaigns"
            className="w-full py-2.5 rounded-xl bg-card border border-border font-bold text-xs hover:bg-accent transition flex items-center justify-center gap-1.5"
          >
            <span>Open Communication Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
