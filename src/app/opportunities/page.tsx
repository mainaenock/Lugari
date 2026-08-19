'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { OpportunitiesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { Briefcase, Search, Filter, MapPin, Calendar, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { Opportunity, WardSlug } from '@/types';

export default function OpportunitiesPage() {
  const { tenant } = useAppState();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    OpportunitiesService.getAll({
      category: selectedCategory || undefined,
      ward: selectedWard as WardSlug || undefined,
      search: searchQuery || undefined,
    }).then(res => setOpportunities(res));
  }, [selectedCategory, selectedWard, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Jobs, Bursaries & Skills Hub</span>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Opportunities in Lugari</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Discover active bursary schemes, teaching jobs, internships, tenders, and youth grants across Lugari.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/education"
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition shadow-sm"
          >
            Bursary & Education Centre →
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search teacher jobs, bursaries, tenders..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Opportunity Categories</option>
          <option value="bursaries">Bursaries & Scholarships</option>
          <option value="jobs">Employment / Jobs</option>
          <option value="internships">Internships & Attachments</option>
          <option value="grants">Grants & Youth Programs</option>
          <option value="tenders">Tenders & Procurement</option>
        </select>

        <select
          value={selectedWard}
          onChange={e => setSelectedWard(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none"
        >
          <option value="">All Wards in Lugari</option>
          {tenant.wards.map(w => (
            <option key={w.id} value={w.slug}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* Opportunity Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map(opp => (
          <div
            key={opp.id}
            className="bg-card border border-border rounded-2xl p-6 hover:border-emerald-500 transition shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {opp.category}
                </span>
                {opp.closingSoon && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Closing Soon
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground hover:text-emerald-600 transition leading-snug">
                  <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Building2Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{opp.organizationName}</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {opp.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Value / Compensation:</span>
                <span className="font-bold text-foreground">{opp.salaryOrValue}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Application Deadline:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{opp.deadline}</span>
                </span>
              </div>

              <Link
                href={`/opportunities/${opp.slug}`}
                className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center justify-center gap-1.5"
              >
                <span>View Full Details & Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function Building2Icon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
  );
}
