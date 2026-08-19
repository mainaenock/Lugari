'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { ProjectsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  FileText, Search, Filter, MapPin, CheckCircle2,
  BarChart3, ArrowRight, ArrowUpRight, DollarSign
} from 'lucide-react';
import { Project, WardSlug, ProjectStatus } from '@/types';

export default function ProjectsPage() {
  const { tenant, currentWard, dataSaver } = useAppState();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    ProjectsService.getAll({
      ward: selectedWard as WardSlug || undefined,
      category: selectedCategory || undefined,
      status: selectedStatus || undefined,
      search: searchQuery || undefined,
    }).then(res => setProjects(res));
  }, [selectedWard, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Page Title & Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Public Infrastructure Tracker</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Development Projects in Lugari</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time tracking of NG-CDF, Kakamega County, and donor-funded infrastructure projects across all 6 wards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/data/projects"
            className="px-4 py-2 rounded-xl bg-card border border-border text-xs font-bold hover:bg-accent transition flex items-center gap-1.5 shadow-sm"
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Project Ledger & Charts</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">

        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search project title or ID..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-emerald-600"
          />
        </div>

        {/* Ward Filter */}
        <select
          value={selectedWard}
          onChange={e => setSelectedWard(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none"
        >
          <option value="">All Wards in Lugari</option>
          {tenant.wards.map(w => (
            <option key={w.id} value={w.slug}>{w.name}</option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Education">Education</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Health">Health</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Youth & Sports">Youth & Sports</option>
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground font-medium focus:outline-none"
        >
          <option value="">All Project Statuses</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed">Delayed</option>
          <option value="Planned">Planned</option>
          <option value="Proposed">Proposed</option>
        </select>

      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-12 text-center border border-border rounded-2xl bg-card text-muted-foreground space-y-2">
          <p className="font-bold text-sm text-foreground">No projects matched your criteria.</p>
          <p className="text-xs">Try resetting filters or searching for different keywords.</p>
          <button
            onClick={() => { setSelectedWard(''); setSelectedCategory(''); setSelectedStatus(''); setSearchQuery(''); }}
            className="mt-2 text-xs font-bold text-emerald-600 underline"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div
              key={p.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-500 transition flex flex-col justify-between"
            >
              {!dataSaver && p.currentPhotoUrl && (
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img src={p.currentPhotoUrl} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <TrustBadge type="Verified Source" size="sm" />
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-bold text-emerald-600 uppercase tracking-wider">{p.category}</span>
                    <span className="font-mono">{p.projectId}</span>
                  </div>

                  <h3 className="font-bold text-base text-foreground leading-snug hover:text-emerald-600 transition">
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2">{p.summary}</p>
                </div>

                {/* Progress Bar & Status */}
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-foreground">Status: <strong className="text-emerald-700">{p.status}</strong></span>
                    <span className="text-emerald-600">{p.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.status === 'Completed' ? 'bg-emerald-600' : p.status === 'Delayed' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${p.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <div>
                    <span>Budget: </span>
                    <strong className="text-foreground">KSh {(p.budgetKsh / 1000000).toFixed(2)}M</strong>
                  </div>
                  <span className="font-semibold text-emerald-700 capitalize">{p.wardSlug} Ward</span>
                </div>
              </div>

              <Link
                href={`/projects/${p.slug}`}
                className="bg-muted/50 px-6 py-3 border-t border-border text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition flex items-center justify-between"
              >
                <span>View Full Project Ledger & Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
